import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users-categories')
export class CategoryUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
