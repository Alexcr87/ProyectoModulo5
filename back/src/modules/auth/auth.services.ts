import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import * as bcrypt from "bcrypt";
import { CredentialUserDto, newChangePasswordDto } from "src/dto/credentialUserDto";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "src/dto/createUserDto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "src/entities/roles.entity";


@Injectable()
export class AuthService {
    constructor (private readonly userService: UserService , 
      private readonly jwtService: JwtService,
      @InjectRepository(Role) 
      private roleRepository: Repository<Role>,
      
     ){}

     
     async sigIn(login:CredentialUserDto){

    
        const user = await this.userService.findUserByEmail(login.email);
        if(!user){
            throw new NotFoundException("user not found")
        };
    
        if(user.isFirstLogin === true){
            //return user.dni
        };
    
        const userHashedPassword= await bcrypt.compare(login.password ,user.password);
    
        
        if(!userHashedPassword){
            throw new UnauthorizedException ("incorrect username and/or password")
        };
    
        if (!login.email || !login.password){
            throw new BadRequestException ("missing data")
        };
    
        
    
      };


  async newPasswordLogin(newPassword : newChangePasswordDto){

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