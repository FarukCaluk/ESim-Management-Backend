import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SimCard, SimCardDocument } from './schemas/simcard.schema';
import { CreateSimCardDto } from './dto/create-simcard.dto';

@Injectable()
export class SimCardsService {
  constructor(@InjectModel(SimCard.name) private simCardModel: Model<SimCardDocument>) {}

  async create(createSimCardDto: CreateSimCardDto): Promise<SimCardDocument> {
    const existing = await this.simCardModel.findOne({ iccid: createSimCardDto.iccid });
    if (existing) throw new BadRequestException('ICCID already exists');
    const createdSimCard = new this.simCardModel(createSimCardDto);
    return createdSimCard.save();
  }

  async findAll(): Promise<SimCardDocument[]> {
    return this.simCardModel.find().exec();
  }

  async findOne(id: string): Promise<SimCardDocument> {
    const simCard = await this.simCardModel.findById(id).exec();
    if (!simCard) throw new BadRequestException('SIM card not found');
    return simCard;
  }

  async update(id: string, updateSimCardDto: Partial<CreateSimCardDto>): Promise<SimCardDocument> {
    const simCard = await this.simCardModel.findByIdAndUpdate(id, updateSimCardDto, { new: true }).exec();
    if (!simCard) throw new BadRequestException('SIM card not found');
    return simCard;
  }

  async remove(id: string): Promise<SimCardDocument> {
    const simCard = await this.simCardModel.findByIdAndDelete(id).exec();
    if (!simCard) throw new BadRequestException('SIM card not found');
    return simCard;
  }
}
