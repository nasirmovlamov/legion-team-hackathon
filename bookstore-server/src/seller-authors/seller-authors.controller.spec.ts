import { Test, TestingModule } from '@nestjs/testing';
import { SellerAuthorsController } from './seller-authors.controller';
import { SellerAuthorsService } from './seller-authors.service';

describe('SellerAuthorsController', () => {
  let controller: SellerAuthorsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellerAuthorsController],
      providers: [SellerAuthorsService],
    }).compile();

    controller = module.get<SellerAuthorsController>(SellerAuthorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
