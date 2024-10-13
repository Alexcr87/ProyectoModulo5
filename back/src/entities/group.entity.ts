import { User } from "src/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Campaign } from "./campaign.entity";

@Entity({ name: 'groups' })
export class Group {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ManyToOne(() => User, (user) => user.groupCreator)
  user: User;

  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable({
    name: 'user_groups', // Nombre de la tabla de unión
    joinColumn: { name: 'groupId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'userId', referencedColumnName: 'id' },
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
