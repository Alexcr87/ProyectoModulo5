import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Campaign } from "./campaign.entity";
import { User } from "./user.entity";

@Entity({ name: 'groups' })
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable({
    name: 'user_groups', // Nombre de la tabla intermedia
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  users: User[];

  @ManyToMany(() => Campaign, (campaign) => campaign.groups)
  @JoinTable({
    name: 'campaign_groups', // Nombre de la tabla intermedia
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'campaign_id', referencedColumnName: 'id' },
  })
  campaigns: Campaign[];
}
