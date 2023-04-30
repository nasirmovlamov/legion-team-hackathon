import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @UseGuards(JwtAuthGuard)
  @Post('users/:id')
  async create(@Body() createBookDto: CreateBookDto, @Param('id') id: string) {
    try {
      const newBook = this.booksService.create(+id, createBookDto);
      return newBook;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get('users/:id')
  async findAllByUser(@Param('id') id: string) {
    try {
      const allBooks = await this.booksService.findAllByUser(+id);
      return allBooks;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  // get query params as isbn
  @Get()
  findAll(@Query('isbn') isbn: string) {
    return this.booksService.findAll(isbn);
  }

  @Put(':bookId/users/:id/confirm')
  async confirmBook(@Param('id') id: string, @Param('bookId') bookId: string) {
    try {
      const confirmBook = await this.booksService.confirmBook(+id, +bookId);
      return confirmBook;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
