import { Resolver, Query, Args } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { PersonHeaviestAnimalDto } from './DTO/person-heaviest-animal.dto';
import { PersonHeaviestGroupDto } from './DTO/person-heaviest-group.dto';
import { PersonMostAnimalsDto } from './DTO/person-most-animals.dto';

@Resolver()
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  // get the person with the heaviest animal
  @Query(() => PersonHeaviestAnimalDto, { name: 'heaviestAnimal' })
  async getPersonWithHeaviestAnimal(): Promise<PersonHeaviestAnimalDto> {
    return this.personService.findPersonWithHeaviestAnimal();
  }

  // get the person with the heaviest group of animals
  @Query(() => PersonHeaviestGroupDto, { name: 'heaviestGroup' })
  async getPersonWithHeaviestGroupOfAnimals(): Promise<PersonHeaviestGroupDto> {
    return this.personService.findPersonWithHeaviestGroupOfAnimals();
  }

  // get the person with the most animals by species
  @Query(() => PersonMostAnimalsDto, { name: 'mostAnimalsBySpecies' })
  async getPersonWithMostAnimalsBySpecies(
    @Args('species') species: string,
  ): Promise<PersonMostAnimalsDto> {
    return this.personService.findPersonWithMostAnimalsBySpecies(species);
  }

  // get  the person with the most animals
  @Query(() => PersonMostAnimalsDto, { name: 'mostAnimals' })
  async getPersonWithMostAnimals(): Promise<PersonMostAnimalsDto> {
    return this.personService.findPersonWithMostAnimals();
  }
}
