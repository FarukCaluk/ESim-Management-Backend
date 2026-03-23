import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plan } from 'src/schemas/plan.schema';
import { CreatePlanDto } from './dto/create-plan.dto';
import { FilterQuery } from 'mongoose';

@Injectable()
export class PlansService {
  constructor(@InjectModel(Plan.name) private planModel: Model<Plan>) {}

  async create(createPlanDto: CreatePlanDto): Promise<Plan> {
    const created = new this.planModel(createPlanDto);
    return created.save();
  }

  async findAll(search?: string): Promise<{ plans: Plan[] }> {
    const filter: FilterQuery<Plan> = {};

    const normalized = search?.trim();
    if (normalized) {
      const limited = normalized.slice(0, 64);
      if (limited.length > 0) {
        const escaped = limited.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        filter.name = { $regex: escaped, $options: 'i' };
      }
    }

    const plans = await this.planModel.find(filter).exec();
    return { plans };
  }

  async findOne(id: string): Promise<Plan | null> {
    return this.planModel.findById(id).exec();
  }

  async update(
    id: string,
    updateDto: Partial<CreatePlanDto>
  ): Promise<Plan | null> {
    return this.planModel
      .findByIdAndUpdate(id, updateDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Plan | null> {
    return this.planModel.findByIdAndDelete(id).exec();
  }
}
