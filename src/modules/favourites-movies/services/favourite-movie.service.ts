import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavouriteMovieEntity } from '../entities/favourite-movie.entity';
import { MovieService } from 'src/modules/movies/services/movie.service';
import { UserService } from 'src/modules/users/services/user.service';
import { CreateFavouriteMovieDto } from '../entities/dto/create-favourite-movie.dto';
import { ResponseFavouriteMovieDto } from '../entities/dto/response-favourite-movie.dto';

@Injectable()
export class FavouriteMovieService {
  constructor(
    @InjectRepository(FavouriteMovieEntity)
    private readonly favouriteMovieRepository: Repository<FavouriteMovieEntity>,
    private readonly movieService: MovieService,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<FavouriteMovieEntity[]> {
    return this.favouriteMovieRepository.find();
  }

  async findOne(id: number): Promise<FavouriteMovieEntity> {
    return this.favouriteMovieRepository.findOne({
      where: { idFavorite: id },
    });
  }

  async create(
    createFavouriteMovieDto: CreateFavouriteMovieDto,
  ): Promise<ResponseFavouriteMovieDto> {
    const movie = await this.movieService.findOne(
      createFavouriteMovieDto.idMovie,
    );
    const user = await this.userService.findOne(createFavouriteMovieDto.idUser);
    const data = new FavouriteMovieEntity();
    data.movies = movie;
    data.user = user;
    const favourite = await this.favouriteMovieRepository.save(data);
    const response = new ResponseFavouriteMovieDto();
    response.idFavorite = favourite.idFavorite;
    response.movie = movie;
    response.createdAt = favourite.createdAt;
    response.updatedAt = favourite.updatedAt;
    return response;
  }

  async remove(id: number): Promise<void> {
    const favourite = await this.favouriteMovieRepository.findOne({
      where: { idFavorite: id },
    });
    if (!favourite) {
      throw new NotFoundException(`Favourite movie with id ${id} not found.`);
    }
    await this.favouriteMovieRepository.delete(id);
  }
}
