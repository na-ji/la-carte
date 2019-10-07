import { Field, Float, InputType } from 'type-graphql';

@InputType()
export class LocationAwareInput {
  @Field(type => Float)
  southWestLatitude: number;

  @Field(type => Float)
  southWestLongitude: number;

  @Field(type => Float)
  northEastLatitude: number;

  @Field(type => Float)
  northEastLongitude: number;
}
