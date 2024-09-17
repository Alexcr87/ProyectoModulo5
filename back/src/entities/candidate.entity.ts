import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from 'uuid'
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { User } from "./user.entity"
import { Vote } from "./vote.entity"


@Entity({name: 'candidate'})
export class Candidate{

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @Column({type: "int"})
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  count: number

  @Column({type: "varchar", length: 20, nullable: false,})
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  postulation: string

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  imgUrl:string

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  list: string

  @OneToMany(()=> Vote, vote=>vote.id)
  @ApiProperty()
  vote: Vote

  @OneToOne(()=> User, user=>user.id)
  @ApiProperty()
  user: User
}