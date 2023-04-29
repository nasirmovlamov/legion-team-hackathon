import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCategoryDto } from './user-create-category.dto';

export class UpdateUserCategoryDto extends PartialType(CreateUserCategoryDto) {}
