import { InputType } from '@nestjs/graphql';
import { IsString, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

@InputType()
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
