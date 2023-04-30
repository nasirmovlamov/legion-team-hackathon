import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  IsNull,
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
  isDonation: boolean;

  @Column({
    default: false,
    nullable: true,
  })
  isConfirmed: boolean;

  @Column()
  price: string;

  @Column()
  condition: string;

  @ManyToOne(() => User, (user) => user.books)
  users: User;
}
