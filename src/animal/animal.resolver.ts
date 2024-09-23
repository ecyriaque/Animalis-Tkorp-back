import { Resolver, Query } from '@nestjs/graphql';
import { Animal } from 'src/entities/animal.entity';
import { AnimalService } from './animal.service';

@Resolver(() => Animal)
export class AnimalResolver {
  constructor(private readonly animalService: AnimalService) {}

  // get the oldest animal
  @Query(() => Animal, { name: 'oldestAnimal' })
  async getOldestAnimal(): Promise<Animal> {
    return this.animalService.getOlderAnimal();
  }

  // get the most popular species
  @Query(() => String, { name: 'popularSpecies' })
  async getPopularSpecies(): Promise<string> {
    return this.animalService.getPopularSpecies();
  }
}
