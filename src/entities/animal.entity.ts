import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Person } from './person.entity';

@ObjectType()
@Entity()
export class Animal {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  species: string;

  @ManyToOne(() => Person, (person) => person.animals)
  owner: Person;
}
