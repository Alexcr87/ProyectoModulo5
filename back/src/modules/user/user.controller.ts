
import { BadRequestException, Body, ConflictException, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpException, HttpStatus, InternalServerErrorException, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, ParseUUIDPipe, Patch, Post, Put, Query, Req, Res, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "src/dto/createUser.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from 'fs';
import { diskStorage } from "multer";
import { extname } from "path";
import { Roles } from "src/roles/roles.decorator";
import { RolesGuard } from "src/Guards/roles.guard";
import { AuthGuard } from "src/Guards/auth.guard";
import { User } from "src/entities/user.entity";
import { Role } from "src/entities/roles.entity";

import { Request, Response } from "express";
import { CreateUserDtoByAuth0 } from "src/dto/createUserByAuth0Dto";
import { promises } from "dns";
import { updateUserDto } from "src/dto/updateUserDto";
import { ExcelFilePipe } from "src/pipes/maxSizeAndFormatPlanilla";



@Controller('/')
export class RedirectController {
  @Get('')
  redirectToFrontend(@Res() res: Response) {
    res.redirect('http://localhost:4000');
  }
}

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
  async findUserByEmail(@Param("email") email: string) {
    try {
      return await this.userService.findUserByEmail(email);
    } catch (error) {
      throw new NotFoundException({ message: error.message });
    }
  }
  


  @Put(":id")
  @HttpCode(200)
  async updateUserById(@Param("id", ParseUUIDPipe) id:string, @Body() createUserDto:updateUserDto):Promise<Omit<User, "password">>{
    
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
      return await this.userService.createUser(createUserDto, parentId);
    } catch (error) {
      // Si es un error esperado que ya tiene una respuesta, la devolvemos
      if (error.response) {
        if (error.response.statusCode === 409) {
          // Conflicto, por ejemplo si ya existe el usuario
          throw new ConflictException(error.response.message || 'User already exists');
        }
        if (error.response.statusCode === 401) {
          // No autorizado
          throw new UnauthorizedException(error.response.message || 'Unauthorized');
        }
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
  async importUsers(@UploadedFile(new ExcelFilePipe())file: Express.Multer.File, @Query("parentId") parentId: string ){
    if (!file) {
      throw new BadRequestException('No file provided');
    }
      const filePath = file.path; // Ruta del archivo guardado
      return await this.userService.importUsers(filePath, parentId);  
  }

  @Patch(':userId/assign-package')
  async assignPackage(
    @Param('userId') userId: string,
    @Body() packageId: number,
  ) {
    const updatedUser = await this.userService.assignPackageToUser(userId, packageId );
    return updatedUser;
  }

}
