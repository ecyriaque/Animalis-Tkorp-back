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

  async remove(id: number): Promise<void> {
    await this.findOne(id);

    await this.personRepository.delete(id);
  }

  async create(personDto: PersonDto): Promise<Person> {
    const person = this.personRepository.create(personDto);
    return await this.personRepository.save(person);
  }

  async update(id: number, personDto: PersonDto): Promise<Person> {
    const person = await this.findOne(id);
    Object.assign(person, personDto); // Met à jour les propriétés existantes
    return await this.personRepository.save(person);
  }
}
