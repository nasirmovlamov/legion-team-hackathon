import { PartialType } from '@nestjs/mapped-types';
import { CreateSellerAuthorDto } from './create-seller-author.dto';

export class UpdateSellerAuthorDto extends PartialType(CreateSellerAuthorDto) {}
