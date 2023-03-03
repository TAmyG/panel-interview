import { Test, TestingModule } from '@nestjs/testing';
import { WildfireController } from '../wildfire.controller';

describe('WildfireController', () => {
  let controller: WildfireController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WildfireController],
    }).compile();

    controller = module.get<WildfireController>(WildfireController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
