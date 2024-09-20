import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from 'src/entities/animal.entity';
import { Repository } from 'typeorm';

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
}
