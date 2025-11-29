import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Collection } from 'src/schemas/collection.schema';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectModel(Collection.name)
    private collectionModel: Model<Collection & Document>
  ) {}

  async create(createCollectionDto: CreateCollectionDto): Promise<Collection> {
    const created = new this.collectionModel(createCollectionDto);
    return created.save();
  }

  async findAll(search?: string): Promise<{ collections: Collection[] }> {
    const filter: FilterQuery<Collection> = {};

    const normalized = search?.trim();
    if (normalized) {
      const limited = normalized.slice(0, 64);
      if (limited.length > 0) {
        const escaped = limited.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        filter.name = { $regex: escaped, $options: 'i' };
      }
    }

    const collections = await this.collectionModel.find(filter).exec();
    return { collections };
  }

  async findOne(id: string): Promise<Collection | null> {
    return this.collectionModel.findById(id).exec();
  }

  async update(
    id: string,
    updateDto: Partial<CreateCollectionDto>
  ): Promise<Collection | null> {
    return this.collectionModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Collection | null> {
    return this.collectionModel.findByIdAndDelete(id).exec();
  }
}
