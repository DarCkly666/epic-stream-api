import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresModule } from './modules/genre/genres.module';
import { SeriesModule } from './modules/series/series.module';
import { connectionOptions } from './db/dataSourceLocal';
import { SeassonModule } from './modules/seassons/seasson.module';
import { EpisodesModule } from './modules/episodes/episodes.module';
import { MoviesModule } from './modules/movies/movies.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    GenresModule,
    SeriesModule,
    SeassonModule,
    EpisodesModule,
    MoviesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
