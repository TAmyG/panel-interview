import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WildfireService } from '../wildfire.service';

describe('WildfireService', () => {
  let service: WildfireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WildfireService],
      imports: [HttpModule, ConfigModule],
    }).compile();

    service = module.get<WildfireService>(WildfireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
