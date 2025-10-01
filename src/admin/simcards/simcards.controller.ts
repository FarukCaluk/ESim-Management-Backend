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

@Controller('simcards')
@UseGuards(JwtAuthGuard)
export class SimCardsController {
  constructor(private readonly simCardsService: SimCardsService) {}

  @Post()
  create(@Body() createSimCardDto: CreateSimCardDto) {
    return this.simCardsService.create(createSimCardDto);
  }

  @Get()
  findAll() {
    return this.simCardsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.simCardsService.findOne(id);
  }

  @Get('reserved')
  findReserved() {
    return this.simCardsService.findReserved();
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() simCardDto: any) {
    return this.simCardsService.update(id, simCardDto);
  }
}
