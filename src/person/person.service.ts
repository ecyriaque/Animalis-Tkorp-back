import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from 'src/entities/person.entity';
import { PersonDto } from './person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  findAll(): Promise<Person[]> {
    return this.personRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({ where: { id } });

    if (!person) {
      throw new NotFoundException(`Person with id ${id} not found`);
    }

    return person;
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.personRepository.delete(id);
    return { message: `Personne avec l'ID ${id} supprimée avec succès` };
  }

  async create(
    personDto: PersonDto,
  ): Promise<{ message: string; person: Person }> {
    const person = this.personRepository.create(personDto);
    const savedPerson = await this.personRepository.save(person);
    return { message: 'Personne créée avec succès', person: savedPerson };
  }

  async update(
    id: number,
    personDto: PersonDto,
  ): Promise<{ message: string; person: Person }> {
    const person = await this.findOne(id);
    Object.assign(person, personDto);
    const updatedPerson = await this.personRepository.save(person);
    return {
      message: 'Personne mise à jour avec succès',
      person: updatedPerson,
    };
  }
}
