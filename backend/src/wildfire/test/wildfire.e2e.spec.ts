import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { WildfireModule } from '../wildfire.module';
import { WildfireService } from '../wildfire.service';
import { data } from './data';

describe('Wildfire E2E', () => {
  let app: INestApplication;
  let mockedWildfireService = { getWildfires: (start: string, end: string) => data };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [WildfireModule],
    })
      //   .overrideProvider(WildfireService)
      //   .useValue(mockedWildfireService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET cats`, () => {
    //const data = mockedWildfireService.getWildfires('', '');
    return request(app.getHttpServer())
      .get('/wildfire?month=JAN&year=2020')
      .expect(200)
      .expect(data);
  });

  afterAll(async () => {
    await app.close();
  });
});
