import { IsString, IsDate, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class AnimalDto {
  @IsString()
  name: string;

  @IsDate()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsString()
  species: string;

  @IsString()
  breed: string;

  @IsString()
  color: string;

  @IsNumber()
  weight: number;

  @IsNumber()
  ownerId: number;
}
