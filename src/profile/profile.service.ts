import { Injectable } from '@nestjs/common';
import { UsersService } from '../admin/users/users.service';

@Injectable()
export class ProfileService {
  constructor(private readonly usersService: UsersService) {}

  async getProfile(userId: string) {
    const user = await this.usersService.findOne(userId);
    return { name: user.name, email: user.email };
  }

  async updateProfileName(userId: string, name: string) {
    const user = await this.usersService.update(userId, { name });
    return { name: user.name, email: user.email };
  }
}
