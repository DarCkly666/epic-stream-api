import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SeassonService } from '../services/seasson.service';
import { CreateSeassonDto } from '../entities/dto/create-seasson.dto';
import { UpdateSeassonDto } from '../entities/dto/update-seasson.dto';

@Controller('seassons')
export class SeassonController {
  constructor(private readonly seassonService: SeassonService) {}

  @Get()
  findAll() {
    return this.seassonService.findAll();
  }

  @Get(':id')
  findOne(id: number) {
    return this.seassonService.findOne(id);
  }

  @Post(':idSeries')
  create(
    @Body() createSeassonDto: CreateSeassonDto,
    @Param('idSeries', ParseIntPipe) idSeries: number,
  ) {
    return this.seassonService.create(createSeassonDto, idSeries);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() seasson: UpdateSeassonDto,
  ) {
    return this.seassonService.update(id, seasson);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seassonService.remove(id);
  }
}
