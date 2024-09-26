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
import { Animal } from 'src/entities/animal.entity';
import { AnimalService } from './animal.service';
import { AnimalDto } from './DTO/animal.dto';

// Controller for handling animal-related HTTP requests
@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  // Endpoint to retrieve all animals
  @Get()
  async findAll(): Promise<Animal[]> {
    return await this.animalService.findAll();
  }

  // Endpoint to retrieve a specific animal by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Animal> {
    // Validate that ID is a non-negative number
    if (isNaN(id) || id < 0) {
      throw new BadRequestException('ID must be a non-negative number');
    }
    return await this.animalService.findOne(id);
  }

  // Endpoint to delete a specific animal by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    if (isNaN(id) || id < 0) {
      throw new BadRequestException('ID must be a non-negative number');
    }
    return await this.animalService.remove(id); // Remove the animal with the specified ID and return a confirmation message
  }

  // Endpoint to create a new animal
  @Post()
  async create(
    @Body() animalDto: AnimalDto,
  ): Promise<{ message: string; animal: Animal }> {
    return await this.animalService.create(animalDto);
  }

  // Endpoint to update an existing animal by ID
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() animalDto: AnimalDto,
  ): Promise<{ message: string; animal: Animal }> {
    if (isNaN(id) || id < 0) {
      throw new BadRequestException('ID must be a non-negative number');
    }
    return await this.animalService.update(id, animalDto);
  }
}
