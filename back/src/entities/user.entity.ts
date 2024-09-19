import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from 'uuid'
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator"
import { Candidate } from "./candidate.entity"
import { Role } from "./roles.entity"


@Entity({name: 'users'})
export class User{

  @PrimaryGeneratedColumn('uuid')
  id: string = uuid()

  @Column({type: "varchar", length: 80, nullable: false})
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty({
    description:'El nombre del usuario, debe tener como mínimo 3 caracteres'
  })
  name: string

  @Column({type: "int"})
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  dni: number

  @Column({type: "varchar", length: 50, nullable: false, unique: true})
  @IsEmail()
  @ApiProperty({
    description:'El email del usuario debe ser un email válido',
    example:'example@gmail.com'
  })
  email: string

  @Column({type: "varchar",nullable: false})
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description:'La contraseña debe tener entre 8 y 15 caracteres y contoner al menos 1 mayuscula, 1 minuscula, 1 número y un caracter especial',
    example:'12345aS@'
  })
  password:string

  @Column({type: "text"})
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  @ApiProperty()
  address: string

  @Column({type: "varchar", length: 50})
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty()
  city: string

  @Column({type: "varchar", length: 50})
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  @ApiProperty()
  country: string
  
  @Column({default: false})
  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    description:'Asignada por default al momento de crear el usuario no debe ser incluida',
    default:false
  })
  suffrage:boolean

  @OneToOne(() => Candidate, candidate => candidate.user, { cascade: ['remove'], onDelete: 'CASCADE' })
  candidate: Candidate;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];
}