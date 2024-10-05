import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpisodeController } from './controllers/episode.controller';
import { EpisodeService } from './services/episode.service';
import { EpisodeEntity } from './entities/episode.entity';
import { SeassonModule } from '../seassons/seasson.module';

@Module({
  imports: [TypeOrmModule.forFeature([EpisodeEntity]), SeassonModule],
  controllers: [EpisodeController],
  providers: [EpisodeService],
})
export class EpisodesModule {}
