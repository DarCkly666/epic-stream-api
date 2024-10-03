import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SeriesEntity } from '../entities/series-entity';
import { CreateSeriesDto } from '../dtos/create-series.dto';
import { UpdateSeriesDto } from '../dtos/update-series.dto';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
    @InjectRepository(SeriesEntity)
    private readonly seriesRepository: Repository<SeriesEntity>,
  ) {}

  async findAll(): Promise<SeriesEntity[]> {
    return await this.seriesRepository.find({
      relations: ['genres'],
    });
  }

  async findOne(id: number): Promise<SeriesEntity> {
    const series = await this.seriesRepository.findOne({
      where: { idSeries: id },
      relations: ['genres'],
    });
    if (!series) {
      throw new NotFoundException(`Series with id ${id} not found.`);
    }
    return series;
  }

  async create(series: CreateSeriesDto): Promise<SeriesEntity> {
    try {
      const genres = await this.genreRepository.findBy({
        idGenre: In(series.genresId),
      });
      const newSeries = new SeriesEntity();
      newSeries.title = series.title;
      newSeries.description = series.description;
      newSeries.releaseDate = series.releaseDate;
      newSeries.genres = genres;
      return await this.seriesRepository.save(newSeries);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(
    id: number,
    updateSeriesDto: UpdateSeriesDto,
  ): Promise<SeriesEntity> {
    try {
      const existingSeries = await this.seriesRepository.findOne({
        where: { idSeries: id },
      });

      if (!existingSeries) {
        throw new NotFoundException(`Series with id ${id} not found.`);
      }

      if (updateSeriesDto.title) {
        existingSeries.title = updateSeriesDto.title;
      }
      if (updateSeriesDto.description) {
        existingSeries.description = updateSeriesDto.description;
      }
      if (updateSeriesDto.releaseDate) {
        existingSeries.releaseDate = updateSeriesDto.releaseDate;
      }
      if (updateSeriesDto.genresId) {
        const genres = await this.genreRepository.findBy({
          idGenre: In(updateSeriesDto.genresId),
        });
        existingSeries.genres = genres;
      }

      return await this.seriesRepository.save(existingSeries);
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.seriesRepository.delete(id);
  }
}
