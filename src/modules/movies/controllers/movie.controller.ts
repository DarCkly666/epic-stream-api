import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { CreateMovieDto } from '../entities/dto/create-movie.dto';
import { UpdateMovieDto } from '../entities/dto/update-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll(@Query('genre') genre?: string) {
    if (genre) {
      return await this.movieService.findAllByGenre(genre);
    }
    return await this.movieService.findAll();
  }

  @Get(':idMovie')
  async findOne(@Param('idMovie') idMovie: number) {
    return await this.movieService.findOne(idMovie);
  }

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto) {
    return await this.movieService.create(createMovieDto);
  }

  @Patch(':idMovie')
  async update(
    @Param('idMovie') idMovie: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return await this.movieService.update(idMovie, updateMovieDto);
  }

  @Delete(':idMovie')
  async remove(@Param('idMovie') idMovie: number) {
    return await this.movieService.remove(idMovie);
  }
}
