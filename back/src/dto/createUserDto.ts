import { ApiProperty, OmitType } from "@nestjs/swagger"
import { User } from "src/entities/user.entity"


export class CreateUserDto extends OmitType (User,["id","rol","suffrage","candidate"] as const){}


