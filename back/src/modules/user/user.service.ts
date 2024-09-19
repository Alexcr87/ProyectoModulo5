import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto} from "src/dto/createUserDto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt"
import { Role } from "src/entities/roles.entity";

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    
    @InjectRepository(Role) 
    private roleRepository: Repository<Role>,
  ) {}

  async getUsers():Promise<User[]> {
 return await this.userRepository.find({relations: ['roles']})
  }

  async deteleUserById(id: string):Promise <string> {
    const userToRemove = await this.userRepository.findOneBy({id})
    if(userToRemove){
      await this.userRepository.remove(userToRemove)
      return `Usuario con id: ${id} eliminado con exito`
    }else{
      throw new NotFoundException(`Usuario con id: ${id} no encontrado `)
    }
  }

  // async updateUserById(id: string, createUserDto:CreateUserDto):Promise<Omit<User, 'password'>> {
  //   const userToUpdate = await this.userRepository.findOne({where: {id}})
  //   if(userToUpdate){
  //     const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
  //     const updateUser = await this.userRepository.save({...userToUpdate, ...createUserDto, password:hashedPassword})
  //     const {password, ...userToShow} =updateUser
  //     return userToShow
  //   }
  // }
  
  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where:{id},
      relations:{candidate:true}
    })

    if(user){
      const {password, ...userToShow}=user
      return userToShow
    }

  }
 
  async findUserByEmail(email:string):Promise<User>{
    return await this.userRepository.findOneBy({email})
  }

  async createUser(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // Buscar el rol por defecto 'voter' (ID 3)
    const defaultRole = await this.roleRepository.findOne({ where: { id: 3 } });
    if (!defaultRole) {
      throw new Error('Default role not found');
    }

    // Si se pasa un rol en el DTO, buscar ese rol, de lo contrario usar el rol por defecto
    let userRoles: Role[] = [defaultRole];
    if (createUserDto.roles && createUserDto.roles.length > 0) {
      userRoles = await this.roleRepository.findByIds(createUserDto.roles);
    }

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
      roles: userRoles,  // Asignamos los roles aquí
    });

    await this.userRepository.save(newUser);

    // Excluir el campo `password` antes de retornar
    const { password, ...result } = newUser;
    return result;
  }
  

}