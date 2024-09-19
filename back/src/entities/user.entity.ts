import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from 'uuid'
import { Candidate } from "./candidate.entity"


@Entity({name: 'users'})
export class User{

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @Column({type: "varchar", length: 80, nullable: false})
  name: string

  @Column({type: "int"})
  dni: number

  @Column({type: "varchar", length: 50, nullable: false, unique: true})
  email: string

  @Column({type: "varchar",nullable: false})
  password:string

  @Column({type: "text"})
  address: string

  @Column({type: "varchar", length: 50})
  city: string

  @Column({type: "varchar", length: 50})
  country: string

  @Column({default: "usuario"})
  rol:string 
  
  @Column({default: false})
  suffrage:boolean

  @OneToOne(() => Candidate, candidate => candidate.user, { cascade: ['remove'], onDelete: 'CASCADE' })
  candidate: Candidate;
}