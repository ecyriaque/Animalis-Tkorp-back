import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Animal } from './entities/animal.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'adminAnimalis',
      password: 'WJAkzemDkxmy2sC',
      database: 'animalis',
      entities: [Person, Animal],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Person, Animal]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
