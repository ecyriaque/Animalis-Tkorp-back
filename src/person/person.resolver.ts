import { Resolver, Query, Args } from '@nestjs/graphql';
import { Person } from 'src/entities/person.entity';
import { PersonService } from './person.service';

@Resolver(() => Person)
export class PersonResolver {
  constructor(private readonly personService: PersonService) {}

  @Query(() => [Person], { name: 'persons' })
  async findAll() {
    return this.personService.findAll();
  }

  @Query(() => Person, { name: 'person' })
  async findOne(@Args('id') id: number) {
    return this.personService.findOne(id);
  }
}
