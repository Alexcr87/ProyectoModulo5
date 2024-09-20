import { Body, ConflictException, Controller, Delete, Get, HttpCode, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/dto/createUserDto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from 'fs';
import { diskStorage } from "multer";
import { extname } from "path";

@ApiTags("Users")
@Controller("user")
export class UserController{
  constructor(
    private readonly userService: UserService
  ) {}

  @Get()
  @HttpCode(200)
  getUsers(){
    try {
      return this.userService.getUsers()
    } catch (error) {
      throw new NotFoundException(error.message)
    }
  }

  @Get(":id")
  @HttpCode(200)
  getUserById(@Param("id", ParseUUIDPipe) id:string){
    try {
      return this.userService.getUserById(id)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Error retrieving user');
      }
    }
  }

  @Get("/dni/:dni")
  @HttpCode(200)
  findUserByDni(@Param("dni") dni:number ){
    try {
      console.log(dni);
      
      return this.userService.findUserByDni(dni)
    } catch (error) {
      
    }
  }

  @Get("/email/:email")
  @HttpCode(200)
  findUserByEmail(@Param("email") email:string ){
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
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Error updating user');
      }
    }
  }


  @Delete(":id")
  @HttpCode(200)
  async deleteUserById(@Param("id", ParseUUIDPipe) id:string){
    try {
      return await this.userService.deteleUserById(id)
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw new InternalServerErrorException('Error deleting user');
      }
    }
  }

  @Post()
  @HttpCode(201)
  createUser(@Body() createUserDto:CreateUserDto){
    try {     
      return this.userService.createUser(createUserDto)
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw new ConflictException('User with this email already exists');
      } else {
        throw new InternalServerErrorException('Error creating user');
      }
    }
  }

  @Post('import')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Carpeta donde se guardará el archivo
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  async importUsers(@UploadedFile() file: Express.Multer.File): Promise<void> {
    const filePath = file.path; // Ruta del archivo guardado
    await this.userService.importUsers(filePath);
  }
}
