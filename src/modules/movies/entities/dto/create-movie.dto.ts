import {
  IsString,
  IsNumber,
  IsUrl,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsUrl()
  image: string;

  @IsUrl()
  @IsOptional()
  banner: string;

  @IsDateString()
  releaseDate: Date;

  @IsNumber()
  duration: number;

  @IsUrl()
  streamUrl: string;

  @IsNumber({}, { each: true })
  genresId: number[];
}
