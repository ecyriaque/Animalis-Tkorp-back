import { Resolver, Query } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { Person } from 'src/entities/person.entity';

@Resolver((of) => Person)
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query((returns) => [Person])
  async persons(): Promise<Person[]> {
    return this.personService.findAll();
  }
}
