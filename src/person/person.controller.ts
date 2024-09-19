import { Controller, Get } from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from 'src/entities/person.entity';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get()
  async findAll(): Promise<Person[]> {
    // Utilisation de Promise ici
    return await this.personService.findAll(); // Attendre la résolution de la promesse
  }
}
