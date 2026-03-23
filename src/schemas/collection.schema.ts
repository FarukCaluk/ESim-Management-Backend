import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Collection extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  country: string;

  @Prop()
  expirationDate: Date;

  @Prop({ required: true })
  createdBy: string;

  @Prop()
  assignedAgency: string;

  @Prop({ type: [Types.ObjectId], ref: 'Plan', default: [] })
  plans: Types.ObjectId[];
}

export const CollectionSchema = SchemaFactory.createForClass(Collection);
