import {
  ActionsDefaultData,
  ActionsDefaultDataType,
  ActionsDefaultObjectData,
} from './actions.static';

export const PermissionsDefaultData = {
  createAny: {
    name: 'createAny',
    actions: [...ActionsDefaultData],
  },
  readAny: {
    name: 'readAny',
    actions: [...ActionsDefaultData],
  },
  updateAny: {
    name: 'updateAny',
    actions: [...ActionsDefaultData],
  },
  deleteAny: {
    name: 'deleteAny',
    actions: [...ActionsDefaultData],
  },
  createOwn: {
    name: 'createOwn',
    actions: [...ActionsDefaultData],
  },
  readOwn: {
    name: 'readOwn',
    actions: [...ActionsDefaultData],
  },
  updateOwn: {
    name: 'updateOwn',
    actions: [...ActionsDefaultData],
  },
  deleteOwn: {
    name: 'deleteOwn',
    actions: [...ActionsDefaultData],
  },
  createRole: {
    name: 'createRole',
    actions: [ActionsDefaultObjectData.CREATE],
  },
  readRole: {
    name: 'readRole',
    actions: [ActionsDefaultObjectData.READ],
  },
  updateRole: {
    name: 'updateRole',
    actions: [ActionsDefaultObjectData.UPDATE],
  },
  deleteRole: {
    name: 'deleteRole',
    actions: [ActionsDefaultObjectData.DELETE],
  },
  createPermission: {
    name: 'createPermission',
    actions: [ActionsDefaultObjectData.CREATE],
  },
  readPermission: {
    name: 'readPermission',
    actions: [ActionsDefaultObjectData.READ],
  },
  updatePermission: {
    name: 'updatePermission',
    actions: [ActionsDefaultObjectData.UPDATE],
  },
  deletePermission: {
    name: 'deletePermission',
    actions: [ActionsDefaultObjectData.DELETE],
  },
  createAction: {
    name: 'createAction',
    actions: [ActionsDefaultObjectData.CREATE],
  },
  readAction: {
    name: 'readAction',
    actions: [ActionsDefaultObjectData.READ],
  },
  updateAction: {
    name: 'updateAction',
    actions: [ActionsDefaultObjectData.UPDATE],
  },
  deleteAction: {
    name: 'deleteAction',
    actions: [ActionsDefaultObjectData.DELETE],
  },
  createUser: {
    name: 'createUser',
    actions: [ActionsDefaultObjectData.CREATE],
  },
  readUser: {
    name: 'readUser',
    actions: [ActionsDefaultObjectData.READ],
  },
  updateUser: {
    name: 'updateUser',
    actions: [ActionsDefaultObjectData.UPDATE],
  },
  deleteUser: {
    name: 'deleteUser',
    actions: [ActionsDefaultObjectData.DELETE],
  },
};

type PermissionName = keyof typeof PermissionsDefaultData;
type test = keyof typeof ActionsDefaultData;
export type PermissionType = {
  name: string;
  actions: string[];
};
