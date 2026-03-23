import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model, Types } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Plan } from '../schemas/plan.schema';
import { Collection } from '../schemas/collection.schema';
import { SimCard, SimCardDocument } from '../schemas/simcard.schema';
import { Package } from '../schemas/package.schema';

@Injectable()
export class DashboardService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Plan.name) private readonly planModel: Model<Plan & Document>,
    @InjectModel(Collection.name)
    private readonly collectionModel: Model<Collection & Document>,
    @InjectModel(SimCard.name)
    private readonly simCardModel: Model<SimCardDocument>,
    @InjectModel(Package.name)
    private readonly packageModel: Model<Package & Document>
  ) {}

  async getOverview() {
    const recentLimit = 10;

    const [
      users,
      plans,
      collections,
      simcards,
      recentUsers,
      recentSimCards,
      recentPlans,
      recentPackages,
      recentCollections,
    ] = await Promise.all([
      this.userModel.countDocuments().exec(),
      this.planModel.countDocuments().exec(),
      this.collectionModel.countDocuments().exec(),
      this.simCardModel.countDocuments().exec(),
      this.userModel
        .find({}, { name: 1, email: 1, createdAt: 1, updatedAt: 1 })
        .sort({ createdAt: -1 })
        .limit(recentLimit)
        .lean()
        .exec(),
      this.simCardModel
        .find({}, { iccid: 1, createdAt: 1, updatedAt: 1 })
        .sort({ createdAt: -1 })
        .limit(recentLimit)
        .lean()
        .exec(),
      this.planModel
        .find({}, { name: 1, createdAt: 1, updatedAt: 1 })
        .sort({ createdAt: -1 })
        .limit(recentLimit)
        .lean()
        .exec(),
      this.packageModel
        .find({}, { name: 1, createdAt: 1, updatedAt: 1 })
        .sort({ createdAt: -1 })
        .limit(recentLimit)
        .lean()
        .exec(),
      this.collectionModel
        .find({}, { name: 1, createdAt: 1, updatedAt: 1 })
        .sort({ createdAt: -1 })
        .limit(recentLimit)
        .lean()
        .exec(),
    ]);

    const activities = [
      ...recentUsers.map((user) =>
        this.buildActivity(
          'user',
          user,
          `New user "${user.name ?? user.email}" added`
        )
      ),
      ...recentSimCards.map((sim) =>
        this.buildActivity('simcard', sim, `SIM ${sim.iccid} added`)
      ),
      ...recentPlans.map((plan) =>
        this.buildActivity('plan', plan, `Plan "${plan.name}" created`)
      ),
      ...recentPackages.map((pkg) =>
        this.buildActivity('package', pkg, `Package "${pkg.name}" created`)
      ),
      ...recentCollections.map((collection) =>
        this.buildActivity(
          'collection',
          collection,
          `Collection "${collection.name}" created`
        )
      ),
    ]
      .sort((a, b) => b.timestampMs - a.timestampMs)
      .slice(0, recentLimit)
      .map(({ timestampMs, ...activity }) => activity);

    return { users, plans, collections, simcards, recent: activities };
  }

  private buildActivity(type: string, doc: any, action: string) {
    const timestamp = this.resolveTimestamp(doc);
    return {
      type,
      action,
      entityId: doc?._id?.toString?.() ?? null,
      timestamp: timestamp.toISOString(),
      timestampMs: timestamp.getTime(),
    };
  }

  private resolveTimestamp(doc: any): Date {
    if (doc.createdAt instanceof Date) {
      return doc.createdAt;
    }
    if (doc.updatedAt instanceof Date) {
      return doc.updatedAt;
    }
    if (doc._id instanceof Types.ObjectId) {
      return doc._id.getTimestamp();
    }
    return new Date();
  }
}
