import { IsString, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

// Data Transfer Object (DTO) for Animal
export class AnimalDto {
  @IsString() // Validates that name is a string
  name: string;

  @IsDate() // Validates that dateOfBirth is a date
  @Type(() => Date) // Transforms the plain object to a Date object
  dateOfBirth: Date;

  @IsString() // Validates that species is a string
  species: string;

  @IsString() // Validates that breed is a string
  breed: string;

  @IsString() // Validates that color is a string
  color: string;

  @IsNumber() // Validates that weight is a number
  weight: number;

  @IsNumber() // Validates that ownerId is a number
  ownerId: number;
}
