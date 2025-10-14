import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { Collection } from 'src/schemas/collection.schema';
import { CreateCollectionDto } from './dto/create-collection.dto';

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

  async findAll(): Promise<Collection[]> {
    return this.collectionModel.find().exec();
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
