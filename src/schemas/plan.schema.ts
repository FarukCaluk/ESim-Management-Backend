import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Plan extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  volume: number;

  @Prop({ required: true })
  days: number;

  @Prop({ required: true })
  providerPrice: number;

  @Prop({ required: true })
  esimflyPrice: number;

  @Prop()
  earnings: number;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Collection' })
  collectionId: Types.ObjectId;

  @Prop({ required: true })
  country: string;

  @Prop()
  available: boolean;

  @Prop()
  availableCount: number;

  // createdAt and updatedAt are automatically managed by { timestamps: true }
}

export const PlanSchema = SchemaFactory.createForClass(Plan);
