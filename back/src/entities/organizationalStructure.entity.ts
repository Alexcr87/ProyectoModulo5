import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class OrganizationalStructure {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { nullable: false ,cascade:true})
  @JoinColumn({ name: 'parentId' })
  parent: User;

  @ManyToOne(() => User, { nullable: false ,cascade:true})
  @JoinColumn({ name: 'childId' })
  child: User;
}
