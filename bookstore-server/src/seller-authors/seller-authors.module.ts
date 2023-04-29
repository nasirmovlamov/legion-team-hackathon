import { Module } from '@nestjs/common';
import { SellerAuthorsService } from './seller-authors.service';
import { SellerAuthorsController } from './seller-authors.controller';

@Module({
  controllers: [SellerAuthorsController],
  providers: [SellerAuthorsService]
})
export class SellerAuthorsModule {}
