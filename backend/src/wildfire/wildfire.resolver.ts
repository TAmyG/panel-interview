import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { UtilHelper } from './helpers/util.helpers';
import { Wildfire } from './models/wildfire.model';
import { WildfireService } from './wildfire.service';

@Resolver((of) => Wildfire)
export class WildfireResolver {
  constructor(private readonly wildfireService: WildfireService) {}

  @Query((returns) => Wildfire, { name: 'wildfire' })
  async getWildfire(@Args('month') month: string, @Args('year') year: string) {
    const dateH = new UtilHelper(month, year);
    const dates: string[] = dateH.getStartEndDate();
    return await this.wildfireService.getWildfires(dates[0], dates[1]);
  }
}
