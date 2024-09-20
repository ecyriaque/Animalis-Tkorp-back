import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Person } from './person.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Animal {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  dateOfBirth: Date;

  @Field()
  @Column()
  species: string;

  @Field()
  @Column()
  breed: string;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column()
  weight: number;

  @Field(() => Person)
  @ManyToOne(() => Person, (person) => person.animals, { onDelete: 'CASCADE' })
  owner: Person;
}
