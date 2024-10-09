import { MovieEntity } from 'src/modules/movies/entities/movie.entity';

export class ResponseFavouriteMovieDto {
  idFavorite: number;
  movie: MovieEntity;
  createdAt: Date;
  updatedAt: Date;
}
