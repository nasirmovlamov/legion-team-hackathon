import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SellerAuthorsService } from './seller-authors.service';
import { CreateSellerAuthorDto } from './dto/create-seller-author.dto';
import { UpdateSellerAuthorDto } from './dto/update-seller-author.dto';

@Controller('seller-authors')
export class SellerAuthorsController {
  constructor(private readonly sellerAuthorsService: SellerAuthorsService) {}

  @Post()
  create(@Body() createSellerAuthorDto: CreateSellerAuthorDto) {
    return this.sellerAuthorsService.create(createSellerAuthorDto);
  }

  @Get()
  findAll() {
    return this.sellerAuthorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellerAuthorsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellerAuthorDto: UpdateSellerAuthorDto) {
    return this.sellerAuthorsService.update(+id, updateSellerAuthorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellerAuthorsService.remove(+id);
  }
}
