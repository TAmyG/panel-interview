import { Controller, Get, Query } from '@nestjs/common';
import { WildfireService } from './wildfire.service';
import { UtilHelper } from './helpers/util.helpers';

@Controller('wildfire')
export class WildfireController {
  constructor(private readonly wildfireService: WildfireService) {}

  //{your route}?month=DEC&year=2021
  @Get()
  async getWildfires(@Query('month') month: string, @Query('year') year: string): Promise<any> {
    try {
      const dateH = new UtilHelper(month, year);
      const dates: string[] = dateH.getStartEndDate();
      return await this.wildfireService.getWildfires(dates[0], dates[1]);
    } catch (error) {
      return error;
    }
  }
}
