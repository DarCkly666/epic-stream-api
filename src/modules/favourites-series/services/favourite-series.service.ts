import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FavouriteSeriesEntity } from '../entities/favourite-series.entity';
import { SeriesService } from 'src/modules/series/services/series.service';
import { UserService } from 'src/modules/users/services/user.service';
import { CreateFavouriteSeriesDto } from '../entities/dto/create-favourite-series.dto';
import { ResponseFavouriteSeriesDto } from '../entities/dto/response-favourite-series.dto';

@Injectable()
export class FavouriteSeriesService {
  constructor(
    @InjectRepository(FavouriteSeriesEntity)
    private readonly favouriteSeriesRepository: Repository<FavouriteSeriesEntity>,
    private readonly seriesService: SeriesService,
    private readonly userService: UserService,
  ) {}

  async findAll(): Promise<FavouriteSeriesEntity[]> {
    return this.favouriteSeriesRepository.find({ relations: ['series'] });
  }

  async findOne(id: number): Promise<FavouriteSeriesEntity> {
    return this.favouriteSeriesRepository.findOne({
      where: { idFavorite: id },
    });
  }

  async findFavouriteSeriesByUser(
    idUser: number,
  ): Promise<FavouriteSeriesEntity[]> {
    const favs = await this.favouriteSeriesRepository.find({
      where: { user: { idUser: idUser } },
      relations: ['series'],
    });
    return favs;
  }

  async create(
    createFavouriteSeriesDto: CreateFavouriteSeriesDto,
  ): Promise<ResponseFavouriteSeriesDto> {
    const series = await this.seriesService.findOne(
      createFavouriteSeriesDto.idSeries,
    );
    const user = await this.userService.findOne(
      createFavouriteSeriesDto.idUser,
    );
    const data = new FavouriteSeriesEntity();
    data.series = series;
    data.user = user;
    const favourite = await this.favouriteSeriesRepository.save(data);
    const response = new ResponseFavouriteSeriesDto();
    response.idFavorite = favourite.idFavorite;
    response.series = series;
    response.createdAt = favourite.createdAt;
    response.updatedAt = favourite.updatedAt;
    return response;
  }

  async remove(id: number): Promise<void> {
    const favourite = await this.favouriteSeriesRepository.findOne({
      where: { idFavorite: id },
    });
    if (!favourite) {
      throw new NotFoundException(`Favourite series with id ${id} not found.`);
    }
    await this.favouriteSeriesRepository.delete(id);
  }
}
