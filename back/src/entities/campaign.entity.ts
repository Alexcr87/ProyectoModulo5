import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Candidate } from './candidate.entity';
import { VoteUser } from './voteUser.entity';
import { Group } from './group.entity';

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

  @OneToMany(() => VoteUser, (voteUser) => voteUser.campaign , { cascade: true }) // Cambié el nombre a `voteUser`
  votes: VoteUser[];

  @ManyToOne(() => User, (user) => user.campaigns)
  user: User;

  @OneToMany(() => Candidate, (candidate) => candidate.campaign , { cascade: true })
  candidates: Candidate[];

  @ManyToMany(() => Group, (group) => group.campaigns )
  groups: Group[];
}

