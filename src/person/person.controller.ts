import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from 'src/entities/person.entity';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async findAll(): Promise<Person[]> {
    return await this.personService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Person> {
    const personId = parseInt(id); // Convertir en nombre

    if (isNaN(personId) || personId < 0) {
      throw new BadRequestException('ID must be a non-negative number');
    }

    return await this.personService.findOne(personId);
  }
}
