import { User } from 'src/users/entities/user.entity';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Jwt } from 'jsonwebtoken';
import { Request } from 'express';
import { Role } from 'src/roles/entities/role.entity';

export const RoleGuard = (
  roles: {
    name: string;
  }[],
): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      //get jwt from request
      const request = context.switchToHttp().getRequest<Request>();
      const token = request.headers?.authorization?.replace('Bearer ', '');
      const jwt = token
        ? (JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString(),
          ) as Jwt)
        : null;
      //get user from jwt
      const jwtDecoded = jwt as any;
      //   check if user has role
      const rolesNames = roles.map((role) => role.name);
      return jwtDecoded.roles.some((role) => rolesNames.includes(role.name));
    }
  }

  return mixin(RoleGuardMixin);
};
