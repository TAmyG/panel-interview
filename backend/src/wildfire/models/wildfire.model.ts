import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Wildfire {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;
}
