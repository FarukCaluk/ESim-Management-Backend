import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlansService } from './plans.service';
import { PlansController } from './plans.controller';
import { Plan, PlanSchema } from 'src/schemas/plan.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Plan.name, schema: PlanSchema }]),
  ],
  controllers: [PlansController],
  providers: [PlansService],
  exports: [PlansService],
})
export class PlansModule {}
