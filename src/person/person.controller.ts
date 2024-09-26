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

  // Get all persons
  @Get()
  async findAll(): Promise<Person[]> {
    return await this.personService.findAll();
  }

  // Get a single person by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Person> {
    // Validate the ID parameter
    if (isNaN(id) || id < 0) {
      throw new BadRequestException('ID must be a non-negative number');
    }
    return await this.personService.findOne(id);
  }

  // Delete a person by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    // Validate the ID parameter
    if (isNaN(id) || id < 0) {
      throw new BadRequestException('ID must be a non-negative number');
    }
    return await this.personService.remove(id);
  }

  // Create a new person
  @Post()
  async create(
    @Body() personDto: PersonDto,
  ): Promise<{ message: string; person: Person }> {
    return await this.personService.create(personDto);
  }

  // Update an existing person
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() personDto: PersonDto,
  ): Promise<{ message: string; person: Person }> {
    // Validate the ID parameter
    if (isNaN(id) || id < 0) {
      throw new BadRequestException('ID must be a non-negative number');
    }
    return await this.personService.update(id, personDto);
  }
}
