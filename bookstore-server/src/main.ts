import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { User } from './users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Permission } from './permissions/entities/permission.entity';
import { ActionsDefaultData } from './static/actions.static';
import { Action } from './actions/entities/action.entity';
import { PermissionsDefaultData } from './static/permissions.static';
import { Role } from './roles/entities/role.entity';
import { RolesDefaultData } from './static/roles.static';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // create actions on startup
  // all actions are created on startup
  for (const action of ActionsDefaultData) {
    const actionExists = await app
      .get(DataSource)
      .getRepository(Action)
      .save({ name: action });
  }

  // loop through permission enum and create them if they don't exist
  const getActions = await app.get(DataSource).getRepository(Action).find();
  for (const permission in PermissionsDefaultData) {
    const permissionExists = await app
      .get(DataSource)
      .getRepository(Permission)
      .save({ name: permission, actions: getActions });
  }

  //loop through permissions and create roles
  const getPermissions = await app
    .get(DataSource)
    .getRepository(Permission)
    .find();

  for (const role in RolesDefaultData) {
    const roleExists = await app
      .get(DataSource)
      .getRepository(Role)
      .save({ name: role, permissions: getPermissions });
  }

  const getRoles = await app.get(DataSource).getRepository(Role).find();

  const userExists = await app.get(DataSource).getRepository(User).save({
    name: 'admin',
    email: 'nasirmovlamov@gmail.com',
    password: '123456',
    roles: getRoles,
  });

  await app.listen(9000);
}
bootstrap();
