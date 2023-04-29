import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { CategoryUser } from 'src/user-categories/entities/user-category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('books')
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column()
  publisher: string;

  @Column()
  isbn: string;

  @Column()
  price: number;

  @Column()
  condition: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @ManyToMany(() => CategoryUser)
  @JoinTable()
  userCategories: CategoryUser[];

  permissions: Permission[];
}
