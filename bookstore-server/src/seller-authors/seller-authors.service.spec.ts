import { Test, TestingModule } from '@nestjs/testing';
import { SellerAuthorsService } from './seller-authors.service';

describe('SellerAuthorsService', () => {
  let service: SellerAuthorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellerAuthorsService],
    }).compile();

    service = module.get<SellerAuthorsService>(SellerAuthorsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
