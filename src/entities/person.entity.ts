import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Animal } from './animal.entity';

@ObjectType()
@Entity()
export class Person {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  phoneNumber: string;

  @Field((type) => [Animal], { nullable: true })
  @OneToMany(() => Animal, (animal) => animal.owner)
  animals: Animal[];
}
