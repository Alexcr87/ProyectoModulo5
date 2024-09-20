import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Role } from "src/entities/roles.entity";


@Module({
  imports:[TypeOrmModule.forFeature([User, Role])],
  providers:[UserService],
  controllers:[UserController]
})

export class UserModule{}