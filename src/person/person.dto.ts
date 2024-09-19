import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class PersonDto {
  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber(null)
  @IsOptional()
  phoneNumber?: string;
}
// Optionnel pour la mise à jour des ojbet
