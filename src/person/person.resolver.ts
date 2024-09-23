import { Resolver, Query } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { PersonHeaviestAnimalDto } from './DTO/person-heaviest-animal.dto';

@Resolver()
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Query(() => PersonHeaviestAnimalDto)
  async getPersonWithHeaviestAnimal(): Promise<PersonHeaviestAnimalDto> {
    return this.personService.findPersonWithHeaviestAnimal();
  }
}
