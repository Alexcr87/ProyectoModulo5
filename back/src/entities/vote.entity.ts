import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from 'uuid'
import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber} from "class-validator"
import { Candidate } from "./candidate.entity"


@Entity({name: 'vote'})
export class Vote{

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @Column()
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  date: Date

  @ManyToOne(()=> Candidate, candidate=>candidate.id)
  @ApiProperty()
  candidate: Candidate
}