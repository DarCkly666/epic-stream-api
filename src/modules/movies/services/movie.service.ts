import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { MovieEntity } from '../entities/movie.entity';
import { CreateMovieDto } from '../entities/dto/create-movie.dto';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import { UpdateMovieDto } from '../entities/dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  async findAll(): Promise<MovieEntity[]> {
    return await this.movieRepository.find();
  }

  async findAllByGenre(genre: string): Promise<MovieEntity[]> {
    return await this.movieRepository
      .createQueryBuilder('movie')
      .innerJoinAndSelect('movie.genres', 'genre')
      .where('LOWER(genre.name) = LOWER(:genre)', { genre })
      .getMany();
  }

  async findOne(id: number): Promise<MovieEntity> {
    const movie = await this.movieRepository.findOne({
      where: { idMovie: id },
    });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async create(createMovieDto: CreateMovieDto): Promise<MovieEntity> {
    const movie = new MovieEntity();
    const genres = await this.genreRepository.findBy({
      idGenre: In(createMovieDto.genresId),
    });
    movie.title = createMovieDto.title;
    movie.description = createMovieDto.description;
    movie.image = createMovieDto.image;
    movie.banner = createMovieDto.banner;
    movie.releaseDate = createMovieDto.releaseDate;
    movie.duration = createMovieDto.duration;
    movie.streamUrl = createMovieDto.streamUrl;
    movie.genres = genres;
    return await this.movieRepository.save(movie);
  }

  async update(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<MovieEntity> {
    const movie = await this.findOne(id);
    if (updateMovieDto.title) {
      movie.title = updateMovieDto.title;
    }
    if (updateMovieDto.description) {
      movie.description = updateMovieDto.description;
    }
    if (updateMovieDto.image) {
      movie.image = updateMovieDto.image;
    }
    if (updateMovieDto.banner) {
      movie.banner = updateMovieDto.banner;
    }
    if (updateMovieDto.releaseDate) {
      movie.releaseDate = updateMovieDto.releaseDate;
    }
    if (updateMovieDto.duration) {
      movie.duration = updateMovieDto.duration;
    }
    if (updateMovieDto.streamUrl) {
      movie.streamUrl = updateMovieDto.streamUrl;
    }
    if (updateMovieDto.genresId) {
      const genres = await this.genreRepository.findBy({
        idGenre: In(updateMovieDto.genresId),
      });
      movie.genres = genres;
    }
    return await this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
  }
}
