import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateUserDto} from "src/dto/createUserDto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

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

  async updateUserById(id: string) {
    throw new Error("Method not implemented.");
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

  async createUser(createUserDto:CreateUserDto):Promise <Omit<User, "password">>{
    const newUser = await this.userRepository.save(createUserDto)
    const {password, ...result} = newUser // agregar confirmacion de password
    return result
  }

}