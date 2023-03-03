import { Controller, Get, Query } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { WildfireService } from './wildfire.service';
import { AxiosResponse } from 'axios';
import { IWildfire } from './IWildfire-response';

@Controller('wildfire')
export class WildfireController {
  constructor(private readonly wildfireService: WildfireService) {}

  //{your route}?month=DEC&year=2021
  @Public()
  @Get()
  async getWildfires(
    @Query('month') month: string,
    @Query('year') year: string,
  ): Promise<any> {
    try {
      console.log(month, year);
      const result: IWildfire = await this.wildfireService.getWildfires(
        month,
        year,
      );
      return result;
    } catch (error) {
      return error;
    }
  }
}
