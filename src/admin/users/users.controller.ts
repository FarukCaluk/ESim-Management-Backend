import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.usersService.create(createUserDto);
      return {
        status: 'success',
        message: 'User created successfully',
        user,
      };
    } catch (error) {
      throw new BadRequestException(error.message || 'Failed to create user');
    }
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return {
      status: 'success',
      message: 'Users retrieved successfully',
      data: users,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      status: 'success',
      message: 'User retrieved successfully',
      user,
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateUserDto>
  ) {
    const user = await this.usersService.update(id, updateUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      status: 'success',
      message: 'User updated successfully',
      user,
    };
  }
}
