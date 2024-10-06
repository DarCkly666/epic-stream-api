import { Module } from '@nestjs/common';
import { MovieController } from './controllers/movie.controller';
import { MovieService } from './services/movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './entities/movie.entity';
import { GenresModule } from '../genre/genres.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), GenresModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MoviesModule {}
