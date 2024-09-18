import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto} from "src/dto/createUserDto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt"

@Injectable()
export class UserService{
  constructor (@InjectRepository(User) private userRepository:Repository<User>){}

  async getUsers():Promise<User[]> {
 return await this.userRepository.find({relations:{candidate:true}})
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

  async updateUserById(id: string, createUserDto:CreateUserDto):Promise<Omit<User, 'password'>> {
    const userToUpdate = await this.userRepository.findOne({where: {id}})
    if(userToUpdate){
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
      const updateUser = await this.userRepository.save({...userToUpdate, ...createUserDto, password:hashedPassword})
      const {password, ...userToShow} =updateUser
      return userToShow
    }
  }
  
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

  async findUserByDni(dni:number):Promise<User>{
    return await this.userRepository.findOneBy({dni})
  }

  async createUser(createUserDto:CreateUserDto):Promise <Omit<User, "password">>{
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10)
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
  });
    await this.userRepository.save(newUser)
    const {password, ...result} = newUser // agregar confirmacion de password
    return result
  }

}