import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Animal } from './entities/animal.entity';
import { ConfigModule } from '@nestjs/config';
import { PersonModule } from './person/person.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppResolver } from './app.resolver';
import { AnimalModule } from './animal/animal.module';

@Module({
  imports: [
    // Global configuration for environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // Configuration for the GraphQL module with Apollo
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.graphql'), // Automatically generates the schema
    }),
    // Configuration for TypeORM to connect to the database
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql', // Type of database (MySQL)
      host: process.env.DATABASE_HOST, // Database host
      port: +process.env.DATABASE_PORT, // Database port
      username: process.env.DATABASE_USERNAME, // Username
      password: process.env.DATABASE_PASSWORD, // Password
      database: process.env.DATABASE_NAME, // Database name
      entities: [Person, Animal], // Entities to use
      synchronize: true, // Automatic synchronization of entities (use with caution in production)
    }),
    PersonModule, // Module for managing persons
    AnimalModule, // Module for managing animals
  ],
  controllers: [AppController], // Application controllers
  providers: [AppService, AppResolver], // Application services and resolvers
})
export class AppModule {}
