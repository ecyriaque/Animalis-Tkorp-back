import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { Person } from 'src/entities/person.entity';
import { PersonDto } from './DTO/person.dto';
import { PersonMostAnimalsBySpeciesDto } from './DTO/person-most-animals-by-species.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  //route that retrieves the person with the most cat
  @Get('most-cats')
  async findPersonWithMostCats(): Promise<PersonMostAnimalsBySpeciesDto> {
    return await this.personService.findPersonWithMostAnimalsBySpecies('cat');
  }

  // route that retrieves the person with the most animals
  @Get('most-animals')
  async findPersonWithMostAnimals(): Promise<Person> {
    return await this.personService.findPersonWithMostAnimals();
  }

  @Get()
  async findAll(): Promise<Person[]> {
    return await this.personService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Person> {
    if (isNaN(id) || id < 0) {
      throw new BadRequestException('ID must be a non-negative number');
    }

    return await this.personService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    if (isNaN(id) || id < 0) {
      throw new BadRequestException('ID must be a non-negative number');
    }
    return await this.personService.remove(id);
  }

  @Post()
  async create(
    @Body() personDto: PersonDto,
  ): Promise<{ message: string; person: Person }> {
    return await this.personService.create(personDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() personDto: PersonDto,
  ): Promise<{ message: string; person: Person }> {
    return await this.personService.update(id, personDto);
  }
}
