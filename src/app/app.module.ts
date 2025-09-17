import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../admin/users/users.module';
import { SimCardsModule } from '../admin/simcards/simcards.module';


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
