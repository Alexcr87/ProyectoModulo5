import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/dto/createUserDto";

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

  @Get()
  @HttpCode(200)
  findUserByDni(@Body() dni:number ){
    try {
      return this.userService.findUserByDni(dni)
    } catch (error) {
      
    }
  }

  @Get()
  @HttpCode(200)
  findUserByEmail(@Body() email:string ){
    try {
      return this.userService.findUserByEmail(email)
    } catch (error) {
      
    }
  }

  @Put(":id")
  @HttpCode(200)
  updateUserById(@Param("id", ParseUUIDPipe) id:string, @Body() createUserDto:CreateUserDto){
    try {
      return this.userService.updateUserById(id, createUserDto)
    } catch (error) {
      
    }
  }

  @Delete(":id")
  @HttpCode(200)
  async deleteUserById(@Param("id", ParseUUIDPipe) id:string){
    try {
      return await this.userService.deteleUserById(id)
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto:CreateUserDto){
    return this.userService.createUser(createUserDto)
  }

}