import { IsNumber } from 'class-validator';

export class CreateFavouriteSeriesDto {
  @IsNumber()
  idUser: number;

  @IsNumber()
  idSeries: number;
}
