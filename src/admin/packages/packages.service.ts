import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Package } from 'src/schemas/package.schema';

@Injectable()
export class PackagesService {
  constructor(
    @InjectModel(Package.name) private packageModel: Model<Package>
  ) {}

  async create(createPackageDto: any): Promise<Package> {
    const createdPackage = new this.packageModel(createPackageDto);
    return createdPackage.save();
  }

  async findAll(search?: string): Promise<Package[]> {
    const query = this.packageModel.find();

    if (typeof search === 'string') {
      const trimmed = search.trim();
      if (trimmed.length > 64) {
        throw new BadRequestException({
          success: false,
          error: {
            code: 'SEARCH_TOO_LONG',
            message: 'Search query must be 64 characters or fewer',
          },
        });
      }
      if (trimmed.length > 0) {
        const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        query.where({ name: { $regex: escaped, $options: 'i' } });
      }
    }

    return query.exec();
  }

  async findOne(id: string): Promise<Package | null> {
    return this.packageModel.findById(id).exec();
  }

  async update(id: string, updatePackageDto: any): Promise<Package | null> {
    return this.packageModel
      .findByIdAndUpdate(id, updatePackageDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Package | null> {
    return this.packageModel.findByIdAndDelete(id).exec();
  }
}
