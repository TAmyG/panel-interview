import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GeoComponent {
  @Field({ nullable: true })
  ISO3166Alpha2: string;

  @Field({ nullable: true })
  ISO3166Alpha3: string;

  @Field({ nullable: true })
  _category: string;

  @Field({ nullable: true })
  _type: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  city_district: string;

  @Field({ nullable: true })
  continent: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  country_code: string;

  @Field({ nullable: true })
  county: string;

  @Field({ nullable: true })
  county_code: string;

  @Field({ nullable: true })
  hamlet: string;

  @Field({ nullable: true })
  political_union: string;

  @Field({ nullable: true })
  postcode: string;

  @Field({ nullable: true })
  road: string;
}
