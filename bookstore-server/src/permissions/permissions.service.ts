import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { create } from 'domain';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    const newPermission = await this.permissionsRepository.create(
      createPermissionDto,
    );
    return await this.permissionsRepository.save(newPermission);
  }

  async findAll(): Promise<Permission[]> {
    return await this.permissionsRepository.find();
  }

  async findOne(id: number): Promise<Permission> {
    return await this.permissionsRepository.findOne({
      where: { id },
    });
  }

  async findWithIds(ids: Permission[]): Promise<Permission[]> {
    return await this.permissionsRepository.findBy({ id: In([...ids]) });
  }

  async update(
    id: number,
    updatePermissionDto: UpdatePermissionDto,
  ): Promise<UpdateResult> {
    return await this.permissionsRepository.update(id, updatePermissionDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.permissionsRepository.delete(id);
  }
}
