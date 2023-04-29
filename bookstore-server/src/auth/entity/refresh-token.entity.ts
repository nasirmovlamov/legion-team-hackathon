import { sign } from 'jsonwebtoken';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';

class RefreshToken {
  constructor(init: Partial<RefreshToken>) {
    Object.assign(this, init);
  }

  id: number;
  userId: number;
  userAgent: string;
  ipaddress: string;
  roles: Role[];
  permissions: Permission[];

  sign(): string {
    return sign({ ...this }, process.env.REFRESH_SECRET);
  }
}

export default RefreshToken;
