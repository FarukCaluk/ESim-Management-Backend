import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Package extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  volume: number;

  @Prop()
  days: number;

  @Prop()
  providerPrice: number;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
