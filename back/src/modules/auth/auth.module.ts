import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.services";
import { UserService } from "../user/user.service";
import { Role } from "src/entities/roles.entity";



@Module({
    imports: [TypeOrmModule.forFeature([User, Role])],
    controllers: [AuthController],
    providers: [AuthService, UserService]
})

export class AuthModule{};