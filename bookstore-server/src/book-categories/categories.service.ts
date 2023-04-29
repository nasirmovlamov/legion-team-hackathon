import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CategoryBook } from './entities/category.entity';
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateCategoryBookDto } from './dto/update-book-category.dto';

@Injectable()
export class CategoryBookService {
  constructor(
    @InjectRepository(CategoryBook)
    private categoryRepository: Repository<CategoryBook>,
  ) {}

  async create(
    createCategoryBookDto: CreateBookCategoryDto,
  ): Promise<CategoryBook> {
    const newCategory = await this.categoryRepository.create(
      createCategoryBookDto,
    );
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<CategoryBook[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<CategoryBook> {
    return await this.categoryRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryBookDto,
  ): Promise<UpdateResult> {
    return await this.categoryRepository.update(id, updateCategoryDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.categoryRepository.delete(id);
  }
}
