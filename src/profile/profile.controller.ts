import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

type AuthenticatedRequest = Request & {
  user?: {
    id: string;
    email: string;
    role?: string;
    name?: string;
  };
};

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(@Req() req: AuthenticatedRequest) {
    if (!req.user?.id) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.profileService.getProfile(req.user.id);
  }

  @Put()
  async updateProfile(
    @Req() req: AuthenticatedRequest,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    if (!req.user?.id) {
      throw new UnauthorizedException('Unauthorized');
    }

    return this.profileService.updateProfileName(
      req.user.id,
      updateProfileDto.name
    );
  }
}
