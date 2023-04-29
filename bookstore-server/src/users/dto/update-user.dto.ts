import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { Role } from 'src/roles/entities/role.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  id: number;
  name: string;
  email: string;
  roles: Role[];
}
