import { SeriesEntity } from 'src/modules/series/entities/series.entity';

export class ResponseFavouriteSeriesDto {
  idFavorite: number;
  series: SeriesEntity;
  createdAt: Date;
  updatedAt: Date;
}
