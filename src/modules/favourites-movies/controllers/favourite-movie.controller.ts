import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CreateFavouriteMovieDto } from '../entities/dto/create-favourite-movie.dto';
import { FavouriteMovieService } from '../services/favourite-movie.service';

@Controller('favourite-movies')
export class FavouriteMovieController {
  constructor(private readonly favouriteMovieService: FavouriteMovieService) {}

  @Get()
  async findAll(@Query('user') user?: number) {
    if (user) {
      return this.favouriteMovieService.findFavouriteMoviesByUser(user);
    }
    return this.favouriteMovieService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.favouriteMovieService.findOne(id);
  }

  @Post()
  async create(@Body() createFavouriteMovieDto: CreateFavouriteMovieDto) {
    return this.favouriteMovieService.create(createFavouriteMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.favouriteMovieService.remove(id);
  }
}
