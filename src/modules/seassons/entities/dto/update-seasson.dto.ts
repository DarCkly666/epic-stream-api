import { PartialType } from '@nestjs/mapped-types';
import { CreateSeassonDto } from './create-seasson.dto';

export class UpdateSeassonDto extends PartialType(CreateSeassonDto) {}
