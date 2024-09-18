import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from 'uuid'
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { User } from "./user.entity"
import { Vote } from "./vote.entity"


@Entity({name: 'candidate'})
export class Candidate{

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

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

  @OneToMany(() => Vote, vote => vote.candidate)
  @ApiProperty({ type: () => [Vote] })
  votes: Vote[];

  @OneToOne(() => User, user => user.candidate, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })  // Esto asegura que 'userId' aparezca en Candidate
  @ApiProperty()
  user: User;
}