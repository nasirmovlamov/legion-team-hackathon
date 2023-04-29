import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    private permissionsService: PermissionsService,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const getPermissions = await this.permissionsService.findWithIds(
      createRoleDto.permissions,
    );
    const createdRole = await this.rolesRepository.create({
      name: createRoleDto.name,
      permissions: getPermissions,
    });
    return await this.rolesRepository.save(createdRole);
  }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find({
      relations: ['permissions'],
    });
  }

  async findOne(id: number): Promise<Role> {
    return await this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  async findWithIds(ids: Role[]): Promise<Role[]> {
    return await this.rolesRepository.findBy({ id: In([...ids]) });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<any> {
    const getPermissions = await this.permissionsService.findWithIds(
      updateRoleDto.permissions,
    );
    const allPermissions = await this.permissionsService.findAll();
    const updatedRole = await this.rolesRepository.update(id, {
      name: updateRoleDto.name,
    });

    const updatedRolePermissions = await this.rolesRepository
      .createQueryBuilder()
      .relation(Role, 'permissions')
      .of(id)
      //add permissions remove old permissions
      .addAndRemove(getPermissions, allPermissions);
    const getUpdatedRole = await this.rolesRepository.findOne({
      where: { id },
      relations: ['permissions'],
    });

    return getUpdatedRole;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.rolesRepository.delete(id);
  }
}
