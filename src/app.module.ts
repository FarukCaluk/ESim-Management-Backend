import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { SimCardsModule } from './simcards/simcards.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // učitava .env fajl
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    SimCardsModule,
  ],
})
export class AppModule {}
