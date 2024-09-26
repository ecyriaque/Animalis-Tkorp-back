import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from 'src/entities/animal.entity';
import { Repository } from 'typeorm';
import { AnimalDto } from './DTO/animal.dto';

// Injectable service for handling animal-related operations
@Injectable()
export class AnimalService {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
  ) {}

  // Fetch all animals with all fields and owner ID
  async findAll(): Promise<Animal[]> {
    return this.animalRepository.find();
  }

  // Get a specific animal by ID
  async findOne(id: number): Promise<Animal> {
    const animal = await this.animalRepository.findOne({ where: { id } });

    if (!animal) {
      throw new NotFoundException(`Animal with id ${id} not found`);
    }

    return animal;
  }

  // Get all animals associated with a specific owner ID
  async getAnimalsByOwnerId(ownerId: number): Promise<Animal[]> {
    const animals = await this.animalRepository.find({
      where: { ownerId },
    });
    console.log(animals);
    if (!animals.length) {
      return [];
    }

    return animals;
  }

  // Remove an animal by ID
  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Ensure the animal exists before deletion
    await this.animalRepository.delete(id);
    return { message: `Animal with ID ${id} successfully removed` };
  }

  // Create a new animal using the provided AnimalDto
  async create(
    AnimalDto: AnimalDto,
  ): Promise<{ message: string; animal: Animal }> {
    const animal = this.animalRepository.create(AnimalDto);
    const savedAnimal = await this.animalRepository.save(animal);
    return { message: 'Animal created successfully', animal: savedAnimal };
  }

  // Update an existing animal with new data from AnimalDto
  async update(
    id: number,
    AnimalDto: AnimalDto,
  ): Promise<{ message: string; animal: Animal }> {
    const animal = await this.findOne(id);
    Object.assign(animal, AnimalDto); // Update the animal's properties
    const updatedAnimal = await this.animalRepository.save(animal);
    return {
      message: 'Animal successfully updated',
      animal: updatedAnimal,
    };
  }

  // Get the oldest animal based on dateOfBirth
  async getOlderAnimal(): Promise<Animal> {
    const animal = await this.animalRepository
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.owner', 'owner')
      .orderBy('animal.dateOfBirth', 'ASC')
      .getOne();

    return animal;
  }

  // Get the most popular species based on the number of animals
  async getPopularSpecies(): Promise<string> {
    const result = await this.animalRepository
      .createQueryBuilder('animal')
      .select('animal.species')
      .addSelect('COUNT(animal.id)', 'count')
      .groupBy('animal.species')
      .orderBy('count', 'DESC')
      .limit(1)
      .getRawOne();

    return result.animal_species; // Return the most popular species
  }
}
