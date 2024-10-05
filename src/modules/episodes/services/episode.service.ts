import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EpisodeEntity } from '../entities/episode.entity';
import { CreateEpisodeDto } from '../entities/dto/create-episode.dto';
import { SeassonEntity } from 'src/modules/seassons/entities/seasson.entity';
import { UpdateEpisodeDto } from '../entities/dto/update-episode.dto';

@Injectable()
export class EpisodeService {
  constructor(
    @InjectRepository(EpisodeEntity)
    private readonly episodeRepository: Repository<EpisodeEntity>,
    @InjectRepository(SeassonEntity)
    private readonly seassonRepository: Repository<SeassonEntity>,
  ) {}

  async findAll(): Promise<EpisodeEntity[]> {
    try {
      return await this.episodeRepository.find();
    } catch (error) {
      throw new HttpException(
        `Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllBySeasson(seassonId: number): Promise<EpisodeEntity[]> {
    const seasson = await this.seassonRepository.findOne({
      where: { idSeasson: seassonId },
    });
    if (!seasson) {
      throw new NotFoundException(`Seasson with id: ${seassonId} not found`);
    }
    try {
      return await this.episodeRepository.find({
        where: { seasson: { idSeasson: seassonId } },
      });
    } catch (error) {
      throw new HttpException(
        `Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number): Promise<EpisodeEntity> {
    try {
      const episode = await this.episodeRepository.findOne({
        where: { idEpisode: id },
      });
      if (!episode) {
        throw new NotFoundException(`Episode with id: ${id} not found`);
      }
      return episode;
    } catch (error) {
      throw new HttpException(
        `Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(createEpisodeDto: CreateEpisodeDto): Promise<EpisodeEntity> {
    try {
      const seasson = await this.seassonRepository.findOne({
        where: { idSeasson: createEpisodeDto.seasson },
      });

      if (!seasson) {
        throw new NotFoundException(
          `Seasson with id: ${createEpisodeDto.seasson} not found`,
        );
      }

      const episode = new EpisodeEntity();
      episode.title = createEpisodeDto.title;
      episode.duration = createEpisodeDto.duration;
      episode.episodeNumber = createEpisodeDto.episodeNumber;
      episode.streamUrl = createEpisodeDto.streamUrl;
      episode.seasson = seasson;
      return await this.episodeRepository.save(episode);
    } catch (error) {
      throw new HttpException(
        `Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: number,
    updateEpisodeDto: UpdateEpisodeDto,
  ): Promise<EpisodeEntity> {
    try {
      const episode = await this.episodeRepository.findOne({
        where: { idEpisode: id },
      });
      if (!episode) {
        throw new NotFoundException(`Episode with id: ${id} not found`);
      }

      if (updateEpisodeDto.title) {
        episode.title = updateEpisodeDto.title;
      }
      if (updateEpisodeDto.duration) {
        episode.duration = updateEpisodeDto.duration;
      }
      if (updateEpisodeDto.episodeNumber) {
        episode.episodeNumber = updateEpisodeDto.episodeNumber;
      }
      if (updateEpisodeDto.streamUrl) {
        episode.streamUrl = updateEpisodeDto.streamUrl;
      }
      if (updateEpisodeDto.seasson) {
        const seasson = await this.seassonRepository.findOne({
          where: { idSeasson: updateEpisodeDto.seasson },
        });
        if (!seasson) {
          throw new NotFoundException(
            `Seasson with id: ${updateEpisodeDto.seasson} not found`,
          );
        }
        episode.seasson = seasson;
      }
      return await this.episodeRepository.save(episode);
    } catch (error) {
      throw new HttpException(
        `Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<EpisodeEntity> {
    try {
      const episode = await this.episodeRepository.findOne({
        where: { idEpisode: id },
      });
      if (!episode) {
        throw new NotFoundException(`Episode with id: ${id} not found`);
      }
      await this.episodeRepository.delete({ idEpisode: id });
      return episode;
    } catch (error) {
      throw new HttpException(
        `Error: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
