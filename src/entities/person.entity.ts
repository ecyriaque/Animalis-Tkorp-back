import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Animal } from './animal.entity';

@ObjectType() // GraphQL Object Type decorator
@Entity() // TypeORM Entity decorator
export class Person {
  @Field(() => Int) // GraphQL field of type Int
  @PrimaryGeneratedColumn() // Auto-incremented primary key
  id: number; // Unique identifier for the person

  @Field() // GraphQL field
  @Column() // Database column
  lastName: string; // Last name of the person

  @Field() // GraphQL field
  @Column() // Database column
  firstName: string; // First name of the person

  @Field() // GraphQL field
  @Column() // Database column
  email: string; // Email address of the person

  @Field() // GraphQL field
  @Column() // Database column
  phoneNumber: string; // Phone number of the person

  @Field(() => [Animal], { nullable: true }) // GraphQL field that returns an array of Animal objects, which can be null
  @OneToMany(() => Animal, (animal) => animal.owner) // Relationship with the Animal entity
  animals: Animal[]; // Array of animals owned by the person
}
