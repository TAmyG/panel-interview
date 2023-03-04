import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Event } from './event.model';

@ObjectType()
export class Wildfire {
  // @Field((type) => Int)
  // id: number;

  // @Field({ nullable: true })
  // firstName?: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  link: string;

  @Field((type) => [Event], { nullable: 'itemsAndList' })
  events: Event[];
}
