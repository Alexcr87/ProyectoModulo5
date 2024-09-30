import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Campaign } from './campaign.entity';
import { Candidate } from './candidate.entity';

@Entity()
export class VoteCandidate {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Candidate, (candidate) => candidate.votes)
  candidate: Candidate;

  @ManyToOne(() => Campaign, (campaign) => campaign.votes)
  campaign: Campaign;

  @Column({ type: 'int', default: 0 })
  count: number; // Conteo de votos para este candidato
}
