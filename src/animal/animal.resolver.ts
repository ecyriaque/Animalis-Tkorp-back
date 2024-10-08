import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Animal } from 'src/entities/animal.entity';
import { AnimalService } from './animal.service';

// GraphQL resolver for handling animal-related queries
@Resolver(() => Animal)
export class AnimalResolver {
  constructor(private readonly animalService: AnimalService) {}

  // Query to get the oldest animal
  @Query(() => Animal, { name: 'oldestAnimal' })
  async getOldestAnimal(): Promise<Animal> {
    return this.animalService.getOlderAnimal();
  }

  // Query to get the most popular species
  @Query(() => String, { name: 'popularSpecies' })
  async getPopularSpecies(): Promise<string> {
    return this.animalService.getPopularSpecies();
  }

  // Query to get animals by owner ID
  @Query(() => [Animal], { name: 'animalsByOwnerId' })
  async getAnimalsByOwnerId(
    @Args('ownerId', { type: () => Int }) ownerId: number,
  ): Promise<Animal[]> {
    return this.animalService.getAnimalsByOwnerId(ownerId);
  }
}
