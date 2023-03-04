import { Field, ObjectType } from '@nestjs/graphql';
import { GeoComponent } from './geo-component.model';
import { Geometry } from './geometry.model';

@ObjectType()
export class Event {
  // @Field((type) => Int)
  // id: number;

  // @Field({ nullable: true })
  // firstName?: string;

  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  link?: string;

  @Field({ nullable: true })
  closed?: string;

  @Field((type) => [Geometry], { nullable: 'itemsAndList' })
  geometry: Geometry[];
}
