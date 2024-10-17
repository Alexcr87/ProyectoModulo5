import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Campaign } from './campaign.entity';

@Entity()
export class VoteUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.votes, {onDelete: 'CASCADE'})
  user: User;

  @ManyToOne(() => Campaign, (campaign) => campaign.votes, {onDelete: 'CASCADE'})
  campaign: Campaign;

  @Column({ default: false })
  blankVote: boolean;

  @CreateDateColumn()
  createdAt: Date; // Fecha y hora del voto
}
