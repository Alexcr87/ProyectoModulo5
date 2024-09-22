import { BadRequestException, Body, ConflictException, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, NotFoundException, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/dto/createUserDto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from 'fs';
import { diskStorage } from "multer";
import { extname } from "path";
import { AllowedUserIds } from "src/roles/roles.decorator";
import { RolesGuard } from "src/Guards/roles.guard";
import { AuthGuard } from "src/Guards/auth.guard";



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
  @AllowedUserIds(1)
  @UseGuards( AuthGuard , RolesGuard)
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
      return this.userService.findUserByDni(dni)
    } catch (error) {
      if(error instanceof NotFoundException){
        const status = error.getStatus();
        return {
          statusCode: status ,
          message: error.message
        }
      }
      else {
        throw new HttpException( "Unexpected error", HttpStatus.CONFLICT)
      }
    }
  }

  @Get("/email/:email")
  @HttpCode(200)
  findUserByEmail(@Param("email") email:string ){
    try {
      return this.userService.findUserByEmail(email)
    } catch (error) {
        if (error instanceof NotFoundException){
          const status = error.getStatus();
          return {
          statusCode: status ,
          message: error.message
          }
        } else {
        throw new InternalServerErrorException('Error retrieving user by email')
      }
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
  async createUser(@Body() createUserDto:CreateUserDto){
    try {     
      return await this.userService.createUser(createUserDto)
    } catch (error) {
      if (error.response && error.response.error === 'Unauthorized') {
        throw new ConflictException(error.response.message);
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
  @ApiOperation({ summary: 'Importa usuarios desde un archivo Excel' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Archivo Excel para importar usuarios',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Archivo cargado correctamente' })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  async importUsers(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file || !file.path) {
        throw new BadRequestException('No se ha seleccionado ningún archivo');
      }
      const filePath = file.path; // Ruta del archivo guardado
      await this.userService.importUsers(filePath);
    } catch (error) {
      if (error instanceof BadRequestException) {
        const status = error.getStatus();
          return {
          statusCode: status ,
          message: error.message
          }
      }else{
        throw new InternalServerErrorException(error.message)
      }
    }
   
  }

}