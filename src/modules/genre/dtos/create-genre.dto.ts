import { IsString, IsNotEmpty } from 'class-validator';
export class CreateGenreDto {
  @IsString()
  @IsNotEmpty({ message: 'The name field is required.' })
  readonly name: string;
}
