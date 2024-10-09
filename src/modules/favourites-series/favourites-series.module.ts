import { Module } from '@nestjs/common';
import { FavouriteSeriesController } from './controllers/favourite-series.controller';
import { FavouriteSeriesService } from './services/favourite-series.service';
import { SeriesModule } from '../series/series.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavouriteSeriesEntity } from './entities/favourite-series.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavouriteSeriesEntity]),
    SeriesModule,
    UsersModule,
  ],
  controllers: [FavouriteSeriesController],
  providers: [FavouriteSeriesService],
})
export class FavouritesSeriesModule {}
