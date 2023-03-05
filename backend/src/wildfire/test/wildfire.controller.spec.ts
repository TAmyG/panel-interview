import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WildfireController } from '../wildfire.controller';
import { WildfireService } from '../wildfire.service';

describe('WildfireController', () => {
  let controller: WildfireController;
  let service: WildfireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WildfireController],
      providers: [WildfireService],
      imports: [HttpModule, ConfigModule],
    }).compile();

    controller = module.get<WildfireController>(WildfireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
