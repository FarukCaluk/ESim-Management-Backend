import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

// Sub-schema za profile
@Schema({ _id: false }) // _id: false jer je ovo samo embedded objekat
export class Profile {
  @Prop({ default: [] })
  orders: string[]; // ili objekti narudžbi

  @Prop()
  avatarUrl: string;

  @Prop()
  phoneNumber: string;

  //  ovdje sve dodatne podatke koji će biti prikazani u frontend-u
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

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
  lastGiftAtOrder: number;

  @Prop({ type: Object })
  metadata: Record<string, any>;

  @Prop({ type: ProfileSchema, default: {} })
  profile: Profile; // sada je profile tip klase Profile
}

export const UserSchema = SchemaFactory.createForClass(User);
