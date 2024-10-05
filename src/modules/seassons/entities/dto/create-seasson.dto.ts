import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSeassonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  seassonNumber: number;

  @IsNumber()
  @IsNotEmpty()
  idSeries: number;
}
