import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeassonController } from './controllers/seasson.controller';
import { SeassonService } from './services/seasson.service';
import { SeassonEntity } from './entities/seasson.entity';
import { SeriesModule } from '../series/series.module';

@Module({
  imports: [TypeOrmModule.forFeature([SeassonEntity]), SeriesModule],
  controllers: [SeassonController],
  providers: [SeassonService],
})
export class SeassonModule {}
