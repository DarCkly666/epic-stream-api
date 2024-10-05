import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSeriesDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsDateString()
  readonly releaseDate: Date;

  @IsString()
  readonly coverUrl: string;

  @IsString()
  @IsOptional()
  readonly bannerUrl: string;

  @IsArray()
  @IsNumber({}, { each: true })
  readonly genresId: number[];
}
