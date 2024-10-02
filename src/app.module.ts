import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './modules/genre/entities/genre.entity';
import { GenresModule } from './modules/genre/genres.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'choutzuyu',
      database: 'db_epicstream',
      entities: [Genre],
      synchronize: true,
      logging: true,
      subscribers: [],
      migrations: [],
    }),
    GenresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
