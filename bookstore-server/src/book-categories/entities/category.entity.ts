import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CategoryBook {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
