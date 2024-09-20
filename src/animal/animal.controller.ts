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

@Controller('animal')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  async findAll(): Promise<Animal[]> {
    return await this.animalService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Animal> {
    if (isNaN(id) || id < 0) {
      throw new BadRequestException('ID must be a non-negative number');
    }
    return await this.animalService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    if (isNaN(id) || id < 0) {
      throw new BadRequestException('ID must be a non-negative number');
    }
    return await this.animalService.remove(id);
  }

  @Post()
  async create(
    @Body() AnimalDto: AnimalDto,
  ): Promise<{ message: string; animal: Animal }> {
    return await this.animalService.create(AnimalDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() AnimalDto: AnimalDto,
  ): Promise<{ message: string; animal: Animal }> {
    return await this.animalService.update(id, AnimalDto);
  }
}
