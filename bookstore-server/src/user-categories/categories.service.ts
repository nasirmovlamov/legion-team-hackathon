import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CategoryUser } from './entities/user-category.entity';
import { CreateUserCategoryDto } from './dto/user-create-category.dto';
import { UpdateUserCategoryDto } from './dto/user-update-category.dto';

@Injectable()
export class CategoryUserService {
  constructor(
    @InjectRepository(CategoryUser)
    private categoryUserRepository: Repository<CategoryUser>,
  ) {}

  async create(
    createCategoryDto: CreateUserCategoryDto,
  ): Promise<CategoryUser> {
    const newCategory = await this.categoryUserRepository.create(
      createCategoryDto,
    );
    return await this.categoryUserRepository.save(newCategory);
  }

  async findWithIds(ids: CategoryUser[]): Promise<CategoryUser[]> {
    return await this.categoryUserRepository.findBy({ id: In([...ids]) });
  }

  async findAll(): Promise<CategoryUser[]> {
    return this.categoryUserRepository.find();
  }

  async findOne(id: number): Promise<CategoryUser> {
    return await this.categoryUserRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateUserCategoryDto: UpdateUserCategoryDto,
  ): Promise<UpdateResult> {
    return await this.categoryUserRepository.update(id, UpdateUserCategoryDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.categoryUserRepository.delete(id);
  }
}
