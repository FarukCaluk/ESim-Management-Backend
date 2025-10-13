import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// Sub-schema za profile
@Schema({ _id: false })
export class Profile {
  @Prop({ default: [] })
  orders: string[];

  @Prop()
  avatarUrl: string;

  @Prop()
  phoneNumber: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, select: false })
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
  lastGiftAtOrder: number;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: ProfileSchema, default: {} })
  profile: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
