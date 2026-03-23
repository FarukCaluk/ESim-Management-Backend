import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { SimCardsService } from './simcards.service';
import { CreateSimCardDto } from './dto/create-simcard.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles/roles.decorator';

@Controller('simcards')
@UseGuards(JwtAuthGuard)
export class SimCardsController {
  constructor(private readonly simCardsService: SimCardsService) {}

  @Roles('admin')
  @Post()
  create(@Body() createSimCardDto: CreateSimCardDto) {
    return this.simCardsService.create(createSimCardDto);
  }

  @Roles('admin', 'support', 'agency')
  @Get()
  findAll() {
    return this.simCardsService.findAll();
  }

  @Roles('admin', 'support', 'agency')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simCardsService.findOne(id);
  }

  @Roles('admin', 'support', 'agency')
  @Get('reserved')
  findReserved() {
    return this.simCardsService.findReserved();
  }

  @Roles('admin')
  @Put(':id')
  update(@Param('id') id: string, @Body() simCardDto: any) {
    return this.simCardsService.update(id, simCardDto);
  }
}
