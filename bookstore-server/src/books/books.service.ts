import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Books } from './entities/book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
    private usersService: UsersService,
  ) {}

  async create(id: number, createBookDto: CreateBookDto) {
    const user = await this.usersService.findOne(id);
    const newBook = await this.booksRepository.create({
      ...createBookDto,
      users: user,
    });
    const addBookToUser = await this.usersService.addBookToUser(id, newBook);
    return await this.booksRepository.save(newBook);
  }

  async findOneByIsbn(isbn: string) {
    const book = await this.booksRepository.findOne({
      where: { isbn },
      relations: ['users'],
    });
    return book;
  }

  async confirmBook(id: number, bookId: number) {
    const user = await this.usersService.findOne(id);
    console.log(user);
    const book = await this.booksRepository.findOne({
      where: { id: bookId },
    });
    // update book
    const updatedBook = await this.booksRepository.save({
      ...book,
      isConfirmed: true,
    });
    return updatedBook;
  }

  async findAllByUser(id: number) {
    const user = await this.usersService.findOne(id);
    const allBooks = await this.booksRepository.find({
      where: { users: user },
      relations: ['users'],
    });
    return allBooks;
  }

  async findAll(isbn?: string) {
    // if isbn is provided, return all books with that isbn
    console.log('isbn', isbn);
    if (isbn) {
      console.log('isbn', isbn);
      return await this.findAllByIsbn(isbn);
    }
    // else return all books
    const allBooks = await this.booksRepository.find({
      relations: ['users'],
    });
    return allBooks;
  }

  async findAllByIsbn(isbn: string) {
    const allBooks = await this.booksRepository.find({
      where: { isbn },
      relations: ['users'],
    });
    return allBooks;
  }

  async findOne(id: number) {
    return await this.booksRepository.findOne({
      where: { id },
      relations: ['users'],
    });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    const bookToUpdate = await this.booksRepository.findOne({
      where: { id },
    });
    const updatedBook = Object.assign(bookToUpdate, updateBookDto);
    return await this.booksRepository.save(updatedBook);
  }

  async remove(id: number) {
    const bookToRemove = await this.booksRepository.findOne({
      where: { id },
    });
    return await this.booksRepository.remove(bookToRemove);
  }
}
