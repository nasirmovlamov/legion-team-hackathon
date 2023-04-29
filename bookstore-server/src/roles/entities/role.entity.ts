import { Permission } from 'src/permissions/entities/permission.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('role')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Permission, {
    cascade: true,
  })
  @JoinTable()
  permissions: Permission[];
}
