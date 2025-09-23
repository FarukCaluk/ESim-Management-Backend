import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SimCard, SimCardDocument } from './schemas/simcard.schema';
import { CreateSimCardDto } from './dto/create-simcard.dto';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class SimCardsService {
  constructor(
    @InjectModel(SimCard.name) private simCardModel: Model<SimCardDocument>,
    private readonly i18n: I18nService,
  ) {}

  async create(createSimCardDto: CreateSimCardDto): Promise<SimCardDocument> {
    const existing = await this.simCardModel.findOne({ iccid: createSimCardDto.iccid });
    if (existing) {
      throw new BadRequestException({
        success: false,
        error: {
          code: 'ICCID_EXISTS',
          message: await this.i18n.translate('errors.ICCID_EXISTS'),
        },
      });
    }
    const createdSimCard = new this.simCardModel(createSimCardDto);
    return createdSimCard.save();
  }

  async findAll(): Promise<SimCardDocument[]> {
    return this.simCardModel.find().exec();
  }

  async findOne(id: string): Promise<SimCardDocument> {
    const simcard = await this.simCardModel.findById(id).populate('userId').exec();
    if (!simcard) {
      throw new NotFoundException({
        success: false,
        error: {
          code: 'SIMCARD_NOT_FOUND',
          message: await this.i18n.translate('errors.SIMCARD_NOT_FOUND'),
        },
      });
    }
    return simcard;
  }

  async findReserved(): Promise<SimCardDocument[]> {
    return this.simCardModel.find({ reserved: true }).exec();
  }

  async update(id: string, updateSimCardDto: Partial<CreateSimCardDto>): Promise<SimCardDocument> {
    const simCard = await this.simCardModel.findByIdAndUpdate(id, updateSimCardDto, { new: true }).exec();
    if (!simCard) {
      throw new NotFoundException({
        success: false,
        error: {
          code: 'SIMCARD_NOT_FOUND',
          message: await this.i18n.translate('errors.SIMCARD_NOT_FOUND'),
        },
      });
    }
    return simCard;
  }
}
