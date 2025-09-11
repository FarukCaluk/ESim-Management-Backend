import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ default: 'bs' })
  language: string;

  @Prop({ default: 'BAM' })
  currency: string;

  @Prop({ default: 'User' })
  type: string;

  @Prop({ default: 0 })
  credits: number;

  @Prop({ default: 0 })
  totalOrders: number;

  @Prop()
  lastGiftAtOrder: Date;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: Object })
  profile: Record<string, any>;
}

export const UserSchema = SchemaFactory.createForClass(User);
