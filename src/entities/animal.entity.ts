import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType() // GraphQL Object Type decorator
@Entity() // TypeORM Entity decorator
export class Animal {
  @Field(() => Int) // GraphQL field of type Int
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number;

  @Field() // GraphQL field
  @Column() // Database column
  name: string; // Name of the animal

  @Field() // GraphQL field
  @Column() // Database column
  dateOfBirth: Date; // Date of birth of the animal

  @Field() // GraphQL field
  @Column() // Database column
  species: string; // Species of the animal

  @Field() // GraphQL field
  @Column() // Database column
  breed: string; // Breed of the animal

  @Field() // GraphQL field
  @Column() // Database column
  color: string; // Color of the animal

  @Field() // GraphQL field
  @Column() // Database column
  weight: number; // Weight of the animal

  @Column() // Database column (not exposed in GraphQL)
  ownerId: number; // ID of the owner (Person) of the animal

  @Field(() => Person) // GraphQL field linking to the Person object type
  @ManyToOne(() => Person, (person) => person.animals, { onDelete: 'CASCADE' }) // Relationship with the Person entity
  owner: Person; // Owner of the animal (Person)
}
