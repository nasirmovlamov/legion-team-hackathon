import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { Permission } from 'src/permissions/entities/permission.entity';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {
  id: number;
  permissions: Permission[];
}
