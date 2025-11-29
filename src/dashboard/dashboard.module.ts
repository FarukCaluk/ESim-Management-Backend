import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { User, UserSchema } from '../schemas/user.schema';
import { Plan, PlanSchema } from '../schemas/plan.schema';
import { Collection, CollectionSchema } from '../schemas/collection.schema';
import { SimCard, SimCardSchema } from '../schemas/simcard.schema';
import { Package, PackageSchema } from '../schemas/package.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: Collection.name, schema: CollectionSchema },
      { name: SimCard.name, schema: SimCardSchema },
      { name: Package.name, schema: PackageSchema },
    ]),
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
