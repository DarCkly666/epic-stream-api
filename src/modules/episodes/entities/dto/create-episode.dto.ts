import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateEpisodeDto {
  @IsString()
  title: string;

  @IsNumber()
  duration: number;

  @IsNumber()
  episodeNumber: number;

  @IsString()
  @IsUrl()
  streamUrl: string;

  @IsNumber()
  seasson: number;
}
