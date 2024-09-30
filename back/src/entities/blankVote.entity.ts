import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Campaign } from './campaign.entity';
import { User } from './user.entity';

@Entity()
export class BlankVote {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Campaign)
  campaign: Campaign;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
