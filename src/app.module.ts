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
import { FavouritesSeriesModule } from './modules/favourites-series/favourites-series.module';
import { FavouritesMoviesModule } from './modules/favourites-movies/favourites-movies.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    GenresModule,
    SeriesModule,
    SeassonModule,
    EpisodesModule,
    MoviesModule,
    UsersModule,
    FavouritesSeriesModule,
    FavouritesMoviesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
