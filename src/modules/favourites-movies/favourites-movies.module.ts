import { Module } from '@nestjs/common';
import { FavouriteMovieService } from './services/favourite-movie.service';
import { MoviesModule } from '../movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouriteMovieEntity } from './entities/favourite-movie.entity';
import { UsersModule } from '../users/users.module';
import { FavouriteMovieController } from './controllers/favourite-movie.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavouriteMovieEntity]),
    MoviesModule,
    UsersModule,
  ],
  controllers: [FavouriteMovieController],
  providers: [FavouriteMovieService],
})
export class FavouritesMoviesModule {}
