import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PersonHeaviestAnimalDto {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  animalName: string;

  @Field()
  weight: number;
}
