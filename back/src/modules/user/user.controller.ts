import { Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("user")
export class UserController{
  constructor(private readonly userService:UserService){}

  @Get()
  @HttpCode(200)
  getUsers(){
    try {
      return this.userService.getUsers()
    } catch (error) {
      
    }
  }

  @Get(":id")
  @HttpCode(200)
  getUserById(@Param("id", ParseUUIDPipe) id:string){
    try {
      return this.userService.getUserById(id)
    } catch (error) {
      
    }
  }

  @Put(":id")
  @HttpCode(200)
  updateUserById(@Param("id", ParseUUIDPipe) id:string){
    try {
      return this.userService.updateUserById(id)
    } catch (error) {
      
    }
  }

  @Delete(":id")
  @HttpCode(200)
  deleteUserById(@Param("id", ParseUUIDPipe) id:string){
    try {
      return this.userService.deteleUserById(id)
    } catch (error) {
      
    }
  }
}