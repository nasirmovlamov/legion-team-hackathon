import { User } from 'src/users/entities/user.entity';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Jwt } from 'jsonwebtoken';
import { Request } from 'express';
import { Permission } from 'src/permissions/entities/permission.entity';
import { verify } from 'jsonwebtoken';
import { PermissionType } from 'src/static/permissions.static';
export const PermissionGuard = (
  guardPermissions: PermissionType[],
): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<Request>();
      const token = request.headers?.authorization?.replace('Bearer ', '');
      const decodedJwt = verify(token, process.env.ACCESS_SECRET) as {
        userId: string;
        roles: string[];
        permissions: Permission[];
      };
      const userPermissions = decodedJwt.permissions as Permission[];
      const userPermissionsNames = userPermissions.map(
        (permission) => permission.name,
      );
      const hasPermission = guardPermissions.every((permission) =>
        userPermissionsNames.includes(permission.name),
      );

      return hasPermission;
    }
  }

  return mixin(PermissionGuardMixin);
};
