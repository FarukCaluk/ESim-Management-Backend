import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { join } from 'path';
import { UsersModule } from '../admin/users/users.module';
import { SimCardsModule } from '../admin/simcards/simcards.module';
import { PackagesModule } from '../admin/packages/packages.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    SimCardsModule,
    AuthModule,
    PackagesModule,
  ],
})
export class AppModule {}
