import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WildfireController } from './wildfire.controller';
import { WildfireResolver } from './wildfire.resolver';
import { WildfireService } from './wildfire.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [WildfireController],
  providers: [WildfireService, WildfireResolver],
})
export class WildfireModule {}
