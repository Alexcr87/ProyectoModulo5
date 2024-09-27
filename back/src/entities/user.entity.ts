import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import {v4 as uuid} from 'uuid'
import { Candidate } from "./candidate.entity"
import { Role } from "./roles.entity"
import { Campaign } from "./campaign.entity"
import { VoteUser } from "./voteUser.entity"


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
  
  @Column({ default: false })
  isFirstLogin: boolean;

  @OneToOne(() => Candidate, candidate => candidate.user, { cascade: ['remove'], onDelete: 'CASCADE' })
  candidate: Candidate;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: Role[];

  @OneToMany(() => Campaign, (campaign) => campaign.user)
  campaigns: Campaign[];

  @OneToMany(() => VoteUser, votoUsuario => votoUsuario.user)
  votes: VoteUser[];
}
