import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { I18nService } from 'nestjs-i18n';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly i18n: I18nService
  ) {}

  private async translate(key: string, lang?: string): Promise<string> {
    try {
      return await this.i18n.translate(key, { lang });
    } catch {
      const fallback: Record<string, string> = {
        'errors.USER_NOT_FOUND': 'User not found',
        'errors.EMAIL_ALREADY_EXISTS': 'Email already exists',
      };
      return fallback[key] || key;
    }
  }

  async create(
    createUserDto: CreateUserDto,
    lang?: string
  ): Promise<UserDocument> {
    const existing = await this.userModel.findOne({
      email: createUserDto.email,
    });
    if (existing) {
      throw new BadRequestException({
        success: false,
        error: {
          code: 'EMAIL_ALREADY_EXISTS',
          message: await this.translate('errors.EMAIL_ALREADY_EXISTS', lang),
        },
      });
    }
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string, lang?: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();

    if (!user) {
      throw new NotFoundException({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: await this.translate('errors.USER_NOT_FOUND', lang),
        },
      });
    }

    return user;
  }

  async update(
    id: string,
    updateUserDto: Partial<CreateUserDto>,
    lang?: string
  ): Promise<UserDocument> {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!user) {
      throw new NotFoundException({
        success: false,
        error: {
          code: 'USER_NOT_FOUND',
          message: await this.translate('errors.USER_NOT_FOUND', lang),
        },
      });
    }

    return user;
  }
}
