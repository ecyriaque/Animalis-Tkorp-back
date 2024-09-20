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

  findAll(): Promise<Animal[]> {
    return this.animalRepository.find();
  }

  async findOne(id: number): Promise<Animal> {
    const animal = await this.animalRepository.findOne({ where: { id } });

    if (!animal) {
      throw new NotFoundException(`Animal with id ${id} not found`);
    }

    return animal;
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

  // Obtenir l'animal le plus vieux
  async getOlderAnimal(): Promise<Animal> {
    const animal = await this.animalRepository
      .createQueryBuilder('animal')
      .orderBy('animal.dateOfBirth', 'ASC')
      .getOne();

    return animal;
  }
}
