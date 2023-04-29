import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async create(createTagDto: CreateTagDto): Promise<Tag> {
    const newTag = await this.tagsRepository.create(createTagDto);
    return await this.tagsRepository.save(newTag);
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagsRepository.find();
  }

  async findOne(id: number): Promise<Tag> {
    return await this.tagsRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateTagDto: UpdateTagDto): Promise<UpdateResult> {
    return await this.tagsRepository.update(id, updateTagDto);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.tagsRepository.delete(id);
  }
}
