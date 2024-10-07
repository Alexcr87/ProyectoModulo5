import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import {
  CredentialUserDto,
  newChangePasswordDto,
} from 'src/dto/credentialUserDto';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/entities/roles.entity';
import { User } from 'src/entities/user.entity';
import { CreateUserDtoByAuth0 } from 'src/dto/createUserByAuth0Dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async sigIn(login: CredentialUserDto) {
    if (!login.email || !login.password) {
      throw new BadRequestException('missing data');
    }

    const user = await this.userRepository.findOne({
      where: { email: login.email },
      relations: ['roles', 'groups'],
    });

    const userHashedPassword = await bcrypt.compare(
      login.password,
      user.password,
    );

    if (!userHashedPassword) {
      throw new UnauthorizedException('incorrect username and/or password');
    }

    if (!user.isFirstLogin) {
      // aca hay que hacer la logica del login
      const userPayload = {
        sub: user.id,
        id: user.id,
        email: user.email,
        roles: user.roles.map((role) => role.name),
      };
      const token = this.jwtService.sign(userPayload);
      const { password: excludedPassword, ...userData } = user;
      return {
        succes: 'Login Successful, Your session will expire in 1 hour',
        token,
        userData,
      };
    } else {
      return { message: 'you need to change your password to log in' };
    }
  }

  async newPasswordLogin(newCredential: newChangePasswordDto) {
    const { dni, password, newPassword, confirmPassword } = newCredential;

    if (!dni || !password || !newPassword || !confirmPassword) {
      throw new BadRequestException('missing data');
    }

    const user = await this.userService.findUserByDni(dni);

    if (newPassword !== confirmPassword) {
      throw new UnauthorizedException('passwords do not match');
    }

    const isPasswordValid = await bcrypt.compare(
      newCredential.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('incorrect current password');
    }

    user.isFirstLogin = false;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);
    return { message: 'password changed successfully' };
  }

  async sigUp(userRegister: CreateUserDto, parentId: string) {
    return this.userService.createUser(userRegister, parentId);
  }

  async createUserByAuth0(user: Partial<CreateUserDtoByAuth0>) {
    const newUser = await this.userService.findUserByEmailxlsx(user.email);

    if (!newUser) {
      await this.userRepository.create(user);
      await this.userRepository.save(user);
      return `${newUser.email}, Usuario creado exitosamente`;
    }
    return `${newUser.email}, Ud. ya posee una cuenta`;
  }
}
