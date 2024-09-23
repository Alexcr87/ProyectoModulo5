import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { Role } from "src/entities/roles.entity";
import { MailService } from "../mail/mail.service";
import { OrganizationalStructure } from "src/entities/organizationalStructure.entity";


@Module({
  imports:[TypeOrmModule.forFeature([User, Role,OrganizationalStructure])],
  providers:[UserService, MailService],
  controllers:[UserController],
  exports: [TypeOrmModule],
})

export class UserModule{}