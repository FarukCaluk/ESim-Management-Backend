// app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  @Get('test-db')
  testDb() {
    return {
      readyState: this.connection.readyState // 1 = connected
    };
  }
}
