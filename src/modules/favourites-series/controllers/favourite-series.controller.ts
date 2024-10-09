import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { FavouriteSeriesService } from '../services/favourite-series.service';
import { CreateFavouriteSeriesDto } from '../entities/dto/create-favourite-series.dto';

@Controller('favourite-series')
export class FavouriteSeriesController {
  constructor(
    private readonly favouriteSeriesService: FavouriteSeriesService,
  ) {}

  @Get()
  async findAll() {
    return this.favouriteSeriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.favouriteSeriesService.findOne(id);
  }

  @Post()
  async create(@Body() createFavouriteSeriesDto: CreateFavouriteSeriesDto) {
    return this.favouriteSeriesService.create(createFavouriteSeriesDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.favouriteSeriesService.remove(id);
  }
}
