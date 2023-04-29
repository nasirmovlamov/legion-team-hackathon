import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateUserCategoryDto } from './dto/user-create-category.dto';
import { UpdateUserCategoryDto } from './dto/user-update-category.dto';
import { CategoryUserService } from './categories.service';

@Controller('user-categories')
export class CategoriesUserController {
  constructor(private readonly categoriesUserService: CategoryUserService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateUserCategoryDto) {
    return this.categoriesUserService.create(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.categoriesUserService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesUserService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateUserCategoryDto,
  ) {
    return this.categoriesUserService.update(+id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesUserService.remove(+id);
  }
}
