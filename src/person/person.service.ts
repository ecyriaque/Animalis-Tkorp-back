import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from 'src/entities/person.entity';
import { PersonDto } from './DTO/person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  // Get all persons
  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  // Get a single person by ID
  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }

    return person;
  }

  // Remove a person by ID
  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id); // Check if the person exists
    await this.personRepository.delete(id); // Delete the person
    return { message: `Person with ID ${id} successfully removed` };
  }

  // Create a new person
  async create(
    personDto: PersonDto,
  ): Promise<{ message: string; person: Person }> {
    const person = this.personRepository.create(personDto); // Create a new person entity
    const savedPerson = await this.personRepository.save(person); // Save to the database
    return { message: 'Person successfully created', person: savedPerson };
  }

  // Update an existing person
  async update(
    id: number,
    personDto: PersonDto,
  ): Promise<{ message: string; person: Person }> {
    const person = await this.findOne(id); // Find the existing person
    Object.assign(person, personDto); // Update the person properties
    const updatedPerson = await this.personRepository.save(person); // Save the updates
    return {
      message: 'Person successfully updated',
      person: updatedPerson,
    };
  }

  // Find the person with the most animals
  async findPersonWithMostAnimals(): Promise<{
    id: number;
    firstName: string;
    lastName: string;
    animalCount: number;
  }> {
    const personWithMostAnimals = await this.personRepository
      .createQueryBuilder('person')
      .innerJoin('person.animals', 'animal')
      .select([
        'person.id AS id',
        'person.firstName AS firstName',
        'person.lastName AS lastName',
      ])
      .addSelect('COUNT(animal.id)', 'animalCount')
      .groupBy('person.id')
      .orderBy('animalCount', 'DESC')
      .getRawOne();

    if (!personWithMostAnimals) {
      throw new NotFoundException('No person found');
    }

    return personWithMostAnimals;
  }

  // Find the person with the most animals of a specific species
  async findPersonWithMostAnimalsBySpecies(species: string): Promise<{
    id: number;
    firstName: string;
    lastName: string;
    animalCount: number;
  }> {
    const personWithMostAnimals = await this.personRepository
      .createQueryBuilder('person')
      .innerJoin('person.animals', 'animal')
      .select([
        'person.id AS id',
        'person.firstName AS firstName',
        'person.lastName AS lastName',
      ])
      .addSelect('COUNT(animal.id)', 'animalCount')
      .where('animal.species = :species', { species })
      .groupBy('person.id')
      .orderBy('animalCount', 'DESC')
      .limit(1)
      .getRawOne();

    if (!personWithMostAnimals) {
      throw new NotFoundException('No person found with specified species');
    }

    return personWithMostAnimals;
  }

  // Find the person with the heaviest animal
  async findPersonWithHeaviestAnimal(): Promise<{
    person_id: number;
    firstName: string;
    lastName: string;
    animal_id: number;
    animalName: string;
    weight: number;
  }> {
    const result = await this.personRepository
      .createQueryBuilder('person')
      .innerJoin('person.animals', 'animal')
      .select([
        'person.id AS person_id',
        'person.firstName AS firstName',
        'person.lastName AS lastName',
        'animal.id AS animal_id',
        'animal.name AS animalName',
        'animal.weight AS weight',
      ])
      .where('animal.weight = (SELECT MAX(weight) FROM animal)')
      .getRawOne();

    if (!result) {
      throw new NotFoundException('No person with heaviest animal found');
    }

    return result;
  }

  // Find the person with the heaviest group of animals
  async findPersonWithHeaviestGroupOfAnimals(): Promise<{
    id: number;
    firstName: string;
    lastName: string;
    totalWeight: number;
  }> {
    const result = await this.personRepository
      .createQueryBuilder('person')
      .innerJoin('person.animals', 'animal')
      .select([
        'person.id as id',
        'person.firstName as firstName',
        'person.lastName as lastName',
      ])
      .addSelect('SUM(animal.weight)', 'totalWeight')
      .groupBy('person.id')
      .orderBy('totalWeight', 'DESC')
      .limit(1)
      .getRawOne();

    if (!result) {
      throw new NotFoundException(
        'No person found with the heaviest group of animals',
      );
    }

    return result;
  }
}
