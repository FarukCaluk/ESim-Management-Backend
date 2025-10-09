import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { Roles } from 'src/auth/roles/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) {}

  @Roles('admin')
  @Post()
  create(@Body() body) {
    console.log('Controller reached');
    return this.packagesService.create(body);
  }

  @Roles('admin', 'support')
  @Get()
  async findAll() {
    return this.packagesService.findAll();
  }

  @Roles('admin', 'support')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.packagesService.findOne(id);
  }

  @Roles('admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePackageDto: any) {
    return this.packagesService.update(id, updatePackageDto);
  }

  @Roles('admin')
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.packagesService.remove(id);
  }
}
