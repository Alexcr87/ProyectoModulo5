import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { CredentialUserDto, newChangePasswordDto } from "src/dto/credentialUserDto";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/dto/createUserDto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "src/entities/roles.entity";
import { User } from "src/entities/user.entity";


@Injectable()
export class AuthService {
    constructor (private readonly userService: UserService , 
      private readonly jwtService: JwtService,
      @InjectRepository(Role) 
      private roleRepository: Repository<Role>,
      @InjectRepository(User) 
      private userRepository: Repository<User>,
      
     ){}

     
     async sigIn(login:CredentialUserDto){

        if (!login.email || !login.password){
            throw new BadRequestException ("missing data")
        };
    
        const user = await this.userService.findUserByEmail(login.email);

        if(!user){
            throw new NotFoundException("user not found")
        };

        if (!user.isFirstLogin) {
            throw new UnauthorizedException("You have already logged in and cannot access the system again.");
        }
        
        const userHashedPassword= await bcrypt.compare(login.password ,user.password);
        if(!userHashedPassword){
            throw new UnauthorizedException ("incorrect username and/or password")
        };

        return { message: "Login successful, you can now change your password with your dni"};
    
      };


  async newPasswordLogin(newCredential : newChangePasswordDto){

  const {dni,password,newPassword,confirmPassword}= newCredential;

  if(!dni|| !password || !newPassword || !confirmPassword){
    throw new BadRequestException ("missing data");
  }

  const user = this.userService.findUserByDni(dni);

  if(!user){
    throw new NotFoundException("user not found");
  };

  const isPasswordValid = await bcrypt.compare(password );
  if (!isPasswordValid) {
      throw new UnauthorizedException("incorrect current password");
  }


  };




  async sigUp(userRegister: CreateUserDto){

   const user = await this.userService.findUserByEmail(userRegister.email);

   if (user){
    throw new HttpException("email is already registered" , HttpStatus.BAD_REQUEST);
   }

   const passwordHashed = await bcrypt.hash(userRegister.password ,10);
if(!passwordHashed){
    throw new HttpException ("password was not hashed", HttpStatus.CONFLICT)
}

 this.userService.createUser({...userRegister,password:passwordHashed});


return {message: "registered user"};

};

}