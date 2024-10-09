import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSeassonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  seassonNumber: number;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: Date;

  @IsNumber()
  @IsNotEmpty()
  idSeries: number;
}
