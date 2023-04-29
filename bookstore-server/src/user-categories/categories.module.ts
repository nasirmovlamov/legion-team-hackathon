import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesUserController } from './categories.controller';
import { CategoryUser } from './entities/user-category.entity';
import { CategoryUserService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryUser])],
  controllers: [CategoriesUserController],
  providers: [CategoryUserService],
  exports: [CategoryUserService],
})
export class CategoriesUserModule {}
