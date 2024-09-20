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

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get('heaviest-group-animals')
  async getPersonWithHeaviestGroupOfAnimals(): Promise<{
    firstName: string;
    lastName: string;
    totalWeight: number;
  }> {
    return await this.personService.findPersonWithHeaviestGroupOfAnimals();
  }

  //route qui recupere le propriétaire de l'animal le plus lourd avec son poid et son nom
  @Get('heaviest-animal')
  async getPersonWithHeaviestAnimal(): Promise<{
    firstName: string;
    lastName: string;
    animalName: string;
    weight: number;
  }> {
    return await this.personService.findPersonWithHeaviestAnimal();
  }

  //route qui recupere la personne avec le plus de chat
  @Get('most-cats')
  async findPersonWithMostCats(): Promise<Person> {
    return await this.personService.findPersonWithMostCats();
  }

  // route qui recupere la personne avec le plus d'animaux
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
