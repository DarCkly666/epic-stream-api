import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeriesController } from './controllers/series.controller';
import { SeriesService } from './services/series.service';
import { SeriesEntity } from './entities/series.entity';
import { GenresModule } from '../genre/genres.module';

@Module({
  imports: [TypeOrmModule.forFeature([SeriesEntity]), GenresModule],
  controllers: [SeriesController],
  providers: [SeriesService],
  exports: [TypeOrmModule],
})
export class SeriesModule {}
