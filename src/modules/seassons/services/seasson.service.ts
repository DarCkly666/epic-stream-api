import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SeassonEntity } from '../entities/seasson.entity';
import { CreateSeassonDto } from '../entities/dto/create-seasson.dto';
import { SeriesEntity } from 'src/modules/series/entities/series.entity';
import { UpdateSeassonDto } from '../entities/dto/update-seasson.dto';

@Injectable()
export class SeassonService {
  constructor(
    @InjectRepository(SeassonEntity)
    private readonly seassonService: Repository<SeassonEntity>,
    @InjectRepository(SeriesEntity)
    private readonly seriesService: Repository<SeriesEntity>,
  ) {}

  async findAll(): Promise<SeassonEntity[]> {
    return await this.seassonService.find({
      relations: ['series', 'episodes'],
    });
  }

  async findOne(id: number): Promise<SeassonEntity> {
    const seasson = await this.seassonService.findOne({
      where: { idSeasson: id },
      relations: ['series', 'episodes'],
    });
    if (!seasson) {
      throw new NotFoundException('Seasson not found');
    }
    return seasson;
  }

  async create(
    createSeasson: CreateSeassonDto,
    idSeries: number,
  ): Promise<SeassonEntity> {
    try {
      const series = await this.seriesService.findOne({
        where: { idSeries: idSeries },
      });
      if (!series) {
        throw new NotFoundException('Series not found');
      }
      const newSeasson = new SeassonEntity();
      newSeasson.name = createSeasson.name;
      newSeasson.seassonNumber = createSeasson.seassonNumber;
      newSeasson.releaseDate = createSeasson.releaseDate;
      newSeasson.series = series;
      return await this.seassonService.save(newSeasson);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, seasson: UpdateSeassonDto): Promise<SeassonEntity> {
    const seassonExist = await this.seassonService.findOne({
      where: { idSeasson: id },
    });

    if (!seassonExist) {
      throw new NotFoundException('Seasson not found');
    }

    if (seasson.name) {
      seassonExist.name = seasson.name;
    }
    if (seasson.seassonNumber) {
      seassonExist.seassonNumber = seasson.seassonNumber;
    }
    if (seasson.releaseDate) {
      seassonExist.releaseDate = seasson.releaseDate;
    }
    if (seasson.idSeries) {
      const series = await this.seriesService.findOne({
        where: { idSeries: seasson.idSeries },
      });
      if (!series) {
        throw new NotFoundException('Series not found');
      }
      seassonExist.series = series;
    }
    return await this.seassonService.save(seassonExist);
  }

  async remove(id: number): Promise<void> {
    const seassonExist = await this.seassonService.findOne({
      where: { idSeasson: id },
    });

    if (!seassonExist) {
      throw new NotFoundException('Seasson not found');
    }
    await this.seassonService.delete({ idSeasson: id });
  }
}
