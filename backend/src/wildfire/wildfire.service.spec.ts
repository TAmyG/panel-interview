import { Test, TestingModule } from '@nestjs/testing';
import { WildfireService } from './wildfire.service';

describe('WildfireService', () => {
  let service: WildfireService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WildfireService],
    }).compile();

    service = module.get<WildfireService>(WildfireService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
