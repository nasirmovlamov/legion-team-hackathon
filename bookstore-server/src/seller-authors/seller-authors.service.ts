import { Injectable } from '@nestjs/common';
import { CreateSellerAuthorDto } from './dto/create-seller-author.dto';
import { UpdateSellerAuthorDto } from './dto/update-seller-author.dto';

@Injectable()
export class SellerAuthorsService {
  create(createSellerAuthorDto: CreateSellerAuthorDto) {
    return 'This action adds a new sellerAuthor';
  }

  findAll() {
    return `This action returns all sellerAuthors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sellerAuthor`;
  }

  update(id: number, updateSellerAuthorDto: UpdateSellerAuthorDto) {
    return `This action updates a #${id} sellerAuthor`;
  }

  remove(id: number) {
    return `This action removes a #${id} sellerAuthor`;
  }
}
