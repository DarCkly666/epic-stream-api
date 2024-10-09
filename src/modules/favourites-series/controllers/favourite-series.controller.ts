import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { FavouriteSeriesService } from '../services/favourite-series.service';
import { CreateFavouriteSeriesDto } from '../entities/dto/create-favourite-series.dto';

@Controller('favourite-series')
export class FavouriteSeriesController {
  constructor(
    private readonly favouriteSeriesService: FavouriteSeriesService,
  ) {}

  @Get()
  async findAll(@Query('user') user?: number) {
    if (user) {
      return this.favouriteSeriesService.findFavouriteSeriesByUser(user);
    }
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
