import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';

export class CreateBlogDto {
  title: string;
  description: string;
  fileBase64: string;
  tags: Tag[];
  categories: Category[];
}
