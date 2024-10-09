import { IsNumber } from 'class-validator';

export class CreateFavouriteMovieDto {
  @IsNumber()
  idUser: number;

  @IsNumber()
  idMovie: number;
}
