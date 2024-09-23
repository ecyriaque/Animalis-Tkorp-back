import { Resolver, Query, Args } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { PersonHeaviestAnimalDto } from './DTO/person-heaviest-animal.dto';
import { PersonHeaviestGroupDto } from './DTO/person-heaviest-group.dto';
import { PersonMostAnimalsBySpeciesDto } from './DTO/person-most-animals-by-species.dto';

@Resolver()
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Query(() => PersonHeaviestAnimalDto)
  async getPersonWithHeaviestAnimal(): Promise<PersonHeaviestAnimalDto> {
    return this.personService.findPersonWithHeaviestAnimal();
  }

  @Query(() => PersonHeaviestGroupDto, {})
  async getPersonWithHeaviestGroupOfAnimals(): Promise<PersonHeaviestGroupDto> {
    return this.personService.findPersonWithHeaviestGroupOfAnimals();
  }

  @Query(() => PersonMostAnimalsBySpeciesDto, { name: 'mostAnimalsBySpecies' })
  async getPersonWithMostAnimalsBySpecies(
    @Args('species') species: string,
  ): Promise<PersonMostAnimalsBySpeciesDto> {
    return this.personService.findPersonWithMostAnimalsBySpecies(species);
  }
}
