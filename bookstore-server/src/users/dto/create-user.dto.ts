import { Role } from 'src/roles/entities/role.entity';
import { CategoryUser } from 'src/user-categories/entities/user-category.entity';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  roles: Role[];
  userCategories: CategoryUser[];
}
