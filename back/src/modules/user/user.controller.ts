import { BadRequestException, Body, ConflictException, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, ParseUUIDPipe, Post, Put, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/dto/createUserDto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from 'fs';
import { diskStorage } from "multer";
import { extname } from "path";
import { Roles } from "src/roles/roles.decorator";
import { RolesGuard } from "src/Guards/roles.guard";
import { AuthGuard } from "src/Guards/auth.guard";
import { User } from "src/entities/user.entity";
import { Role } from "src/entities/roles.entity";
import { CreateUserDtoByAdmin } from "src/dto/createUserByAdminDto";
import { Request } from "express";


@ApiTags("Users")
@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}


  @Get()
  @HttpCode(200)
  @ApiQuery({ name: 'parentId', required: false, description: 'Optional parent ID to filter users' })
  async getUsers(@Query("parentId") parentId?: string): Promise<User[]> {
    try {
      return await this.userService.getUsers(parentId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }


  @Get(":id")
  @HttpCode(200)
  async getUserById(@Param("id", ParseUUIDPipe) id:string){
    try {
      return await this.userService.getUserById(id)
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
  async findUserByDni(@Param("dni") dni:number ){
    try {
      return await this.userService.findUserByDni(dni)
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
  async findUserByEmail(@Param("email") email:string ){
    try {
      return await this.userService.findUserByEmail(email)
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
  async updateUserById(@Param("id", ParseUUIDPipe) id:string, @Body() createUserDto:CreateUserDto){
    try {
      return await this.userService.updateUserById(id, createUserDto)
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
  @ApiQuery({ name: 'parentId', required: false, description: 'Optional parent ID to filter users' })
  async createUser(
    @Query("parentId") parentId: string,
    @Body() createUserDto: CreateUserDto
  ) {
    try {     
      return await this.userService.createUser(createUserDto,parentId)
    } catch (error) {
      if (error.response && error.response.error === 'Unauthorized') {
        throw new ConflictException(error.response.message);
      } else {
        throw new InternalServerErrorException('Error creating user');
      }
    }
  }


  @Post("/byadmin")
  @HttpCode(201)
  @ApiQuery({ name: 'parentId', required: false, description: 'Optional parent ID to filter users' })
  async createUserByAdmin(
    @Query("parentId") parentId: string,
    @Body() createUserDto: CreateUserDtoByAdmin
  ) {
    try {     
      return await this.userService.createUserByAdmin(createUserDto,parentId)
    } catch (error) {
      if (error.response && error.response.error === 'Unauthorized') {
        throw new ConflictException(error.response.message);
      } else {
        throw new InternalServerErrorException('Error creating user');
      }
    }
  }

  //EXCELL
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
  @ApiOperation({ summary: 'Import users from an Excel file' })
  @ApiConsumes('multipart/form-data')
  @ApiQuery({ name: 'parentId', required: false, description: 'Optional parent ID to filter users' })
  @ApiBody({
    description: 'Excel file to import users',
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
  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Incorrect request' })
  async importUsers(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new MaxFileSizeValidator({
          maxSize: 2000000, // 2Mb
          message: 'The file is too large; must be less than 2Mb',
        }),
        /*new FileTypeValidator({
          fileType: /(xls|xlsx)$/,
        }),*/
      ],
    }),
  ) file: Express.Multer.File, @Query("parentId") parentId: string )
  {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
      const filePath = file.path; // Ruta del archivo guardado
      return await this.userService.importUsers(filePath, parentId);  
  }

  @Get('auth0/protected')
  getAuth0Protected(@Req() req:Request){
    console.log(req.oidc.accessToken);
    return JSON.stringify(req.oidc.user)
  }
  
}
