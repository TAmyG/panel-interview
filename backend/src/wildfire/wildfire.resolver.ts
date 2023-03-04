import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Wildfire } from './models/wildfire.model';
import { WildfireService } from './wildfire.service';

@Resolver((of) => Wildfire)
export class WildfireResolver {
  constructor(private readonly wildfireService: WildfireService) {}

  @Query((returns) => Wildfire, { name: 'wildfire' })
  getWildfire(@Args('id', { type: () => Int }) id: number, @Args('firstName') firstName: string) {
    return this.wildfireService.getWild(id, firstName);
  }
}
