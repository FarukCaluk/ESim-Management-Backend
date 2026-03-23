import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type SimCardDocument = SimCard & Document;

@Schema({ timestamps: true })
export class SimCard {
  @Prop({ required: true, unique: true })
  iccid: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId })
  providerId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, default: null })
  orderId: Types.ObjectId;

  @Prop({ default: '' })
  comment: string;

  @Prop({ default: false })
  reserved: boolean;

  @Prop({ default: () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) }) // +12 mjeseci
  expirationDate: Date;
}

export const SimCardSchema = SchemaFactory.createForClass(SimCard);
