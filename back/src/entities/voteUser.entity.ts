import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Campaign } from "./campaign.entity";

@Entity()
export class VoteUser {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.votes)
  user: User;

  @ManyToOne(() => Campaign, campaign => campaign.votes)
  campaign: Campaign;

  @CreateDateColumn()
  createdAt: Date;  // Fecha y hora del voto
}
