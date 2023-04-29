import { Module } from '@nestjs/common';
import { CategoriesBookController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryBook } from './entities/category.entity';
import { CategoryBookService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryBook])],
  controllers: [CategoriesBookController],
  providers: [CategoryBookService],
  exports: [CategoryBookService],
})
export class CategoriesBookModule {}
