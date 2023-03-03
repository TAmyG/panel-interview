import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WildfireModule } from './wildfire/wildfire.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), WildfireModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
