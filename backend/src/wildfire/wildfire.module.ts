import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WildfireController } from './wildfire.controller';
import { WildfireResolver, GeometryResolver } from './resolvers';
import { WildfireService } from './wildfire.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [WildfireController],
  providers: [WildfireService, WildfireResolver, GeometryResolver],
})
export class WildfireModule {}
