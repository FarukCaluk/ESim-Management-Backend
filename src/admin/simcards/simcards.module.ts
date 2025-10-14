import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SimCardsService } from './simcards.service';
import { SimCardsController } from './simcards.controller';
import { SimCard, SimCardSchema } from '../../schemas/simcard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: SimCard.name, schema: SimCardSchema }]),
  ],
  controllers: [SimCardsController],
  providers: [SimCardsService],
  exports: [SimCardsService],
})
export class SimCardsModule {}
