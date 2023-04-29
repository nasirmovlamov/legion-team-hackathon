import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from 'src/roles/entities/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      select: ['id', 'name', 'email'],
      relations: ['roles', 'roles.permissions'],
    });
  }

  async findByEmailAndGetPassword(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password'],
      relations: ['roles', 'roles.permissions'],
    });
    return {
      ...user,
      permissions: user.roles.map((item) => item.permissions).flat(),
    };
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email'],
      relations: ['roles', 'roles.permissions'],
    });

    return {
      ...user,
      permissions: user.roles.map((item) => item.permissions).flat(),
    };
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email'],
      relations: ['roles', 'roles.permissions'],
    });
  }

  async remove(id: string): Promise<boolean> {
    const deletedUser = await this.usersRepository.delete(id);

    if (deletedUser.affected === 0) {
      throw new NotFoundException('User not found');
    }
    return true;
  }

  async create(user: CreateUserDto): Promise<Omit<User, 'password'>> {
    const userRoles = await this.rolesService.findWithIds(user.roles);
    const newUser = await this.usersRepository.create({
      name: user.name,
      email: user.email,
      password: user.password,
      roles: userRoles,
    });

    //save user with relations (roles)
    await this.usersRepository.save(newUser);
    const userWithRoles = await this.usersRepository.findOne({
      where: { id: newUser.id },
      relations: ['roles', 'roles.permissions'],
    });

    return {
      id: userWithRoles.id,
      name: userWithRoles.name,
      email: userWithRoles.email,
      roles: userWithRoles.roles,
      permissions: userWithRoles.roles.map((item) => item.permissions).flat(),
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<any> {
    const getRoles = await this.rolesService.findWithIds(updateUserDto.roles);
    const allRoles = await this.rolesService.findAll();

    const updatedUserRoles = await this.usersRepository
      .createQueryBuilder()
      .relation(User, 'roles')
      .of(id)
      //add permissions remove old permissions
      .addAndRemove(getRoles, allRoles);
    const getUpdatedRole = await this.usersRepository.findOne({
      where: { id },
      relations: ['roles', 'roles.permissions'],
    });

    return getUpdatedRole;
  }
}
