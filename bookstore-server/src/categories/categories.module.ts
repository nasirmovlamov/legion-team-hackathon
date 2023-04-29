import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoryService } from './categories.service';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoriesModule {}
