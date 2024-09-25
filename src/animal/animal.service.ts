import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from 'src/entities/animal.entity';
import { Repository } from 'typeorm';
import { AnimalDto } from './DTO/animal.dto';

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

  // get a specific animal by ID
  async findOne(id: number): Promise<Animal> {
    const animal = await this.animalRepository.findOne({ where: { id } })s;

    if (!animal) {
      throw new NotFoundException(`Animal with id ${id} not found`);
    }

    return animal;
  }

  
  async getAnimalsByOwnerId(ownerId: number): Promise<Animal[]> {
    const animals = await this.animalRepository.find({
      where: { ownerId },s
    });
    console.log(animals);
    if (!animals.length) {
      return [];
    }

    return animals;
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.animalRepository.delete(id);
    return { message: `Animal avec l'ID ${id} supprimée avec succès` };
  }

  async create(
    AnimalDto: AnimalDto,
  ): Promise<{ message: string; animal: Animal }> {
    const animal = this.animalRepository.create(AnimalDto);
    const savedAnimal = await this.animalRepository.save(animal);
    return { message: 'Animal créé avec succès', animal: savedAnimal };
  }

  async update(
    id: number,
    AnimalDto: AnimalDto,
  ): Promise<{ message: string; animal: Animal }> {
    const animal = await this.findOne(id);
    Object.assign(animal, AnimalDto);
    const updatedAnimal = await this.animalRepository.save(animal);
    return {
      message: 'Personne mise à jour avec succès',
      animal: updatedAnimal,
    };
  }

  //get the oldest animal
  async getOlderAnimal(): Promise<Animal> {
    const animal = await this.animalRepository
      .createQueryBuilder('animal')
      .leftJoinAndSelect('animal.owner', 'owner') // Inclure le propriétaire
      .orderBy('animal.dateOfBirth', 'ASC')
      .getOne();

    return animal;
  }

  async getPopularSpecies(): Promise<string> {
    const result = await this.animalRepository
      .createQueryBuilder('animal')
      .select('animal.species')
      .addSelect('COUNT(animal.id)', 'count')
      .groupBy('animal.species')
      .orderBy('count', 'DESC')
      .limit(1)
      .getRawOne();

    return result.animal_species;
  }
}
