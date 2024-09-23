import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Candidate } from './candidate.entity';

@Entity('campaigns')
export class Campaign {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @ManyToOne(() => User, (user) => user.campaigns)
  user: User;

  @ManyToMany(() => User, (user) => user.votedCampaigns)
  voters: User[];

  @OneToMany(() => Candidate, (candidate) => candidate.campaign)
  candidates: Candidate[];
}

