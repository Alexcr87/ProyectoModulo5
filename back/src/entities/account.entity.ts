import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Account {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  maxParticipants: number;

  @Column()
  price: number;

  @Column({type:'varchar', nullable: false})
  description: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;
}