import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Genre } from './modules/genre/entities/genre.entity';
import { GenresModule } from './modules/genre/genres.module';
import { SeriesModule } from './modules/series/series.module';
import { connectionOptions } from './db/dataSourceLocal';
import { SeassonModule } from './modules/seassons/seasson.module';
import { EpisodesModule } from './modules/episodes/episodes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    GenresModule,
    SeriesModule,
    SeassonModule,
    EpisodesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
