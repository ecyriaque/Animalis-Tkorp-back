import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { Animal } from 'src/entities/animal.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalResolver } from './animal.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  controllers: [AnimalController],
  providers: [AnimalService, AnimalResolver],
})
export class AnimalModule {}
