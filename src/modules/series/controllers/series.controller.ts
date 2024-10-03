import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { SeriesService } from '../services/series.service';
import { CreateSeriesDto } from '../dtos/create-series.dto';
import { UpdateSeriesDto } from '../dtos/update-series.dto';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesSerive: SeriesService) {}

  @Get()
  findAll() {
    return this.seriesSerive.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.seriesSerive.findOne(id);
  }

  @Post()
  create(@Body() createSeriesDto: CreateSeriesDto) {
    return this.seriesSerive.create(createSeriesDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSeriesDto: UpdateSeriesDto,
  ) {
    return this.seriesSerive.update(id, updateSeriesDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.seriesSerive.remove(id);
  }
}
