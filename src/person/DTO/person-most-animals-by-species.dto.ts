import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PersonMostAnimalsBySpeciesDto {
  @Field()
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  animalCount: number;
}
