import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresService } from './services/genres.service';
import { GenresController } from './controllers/genres.controller';
import { GenreEntity } from './entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GenreEntity])],
  controllers: [GenresController],
  providers: [GenresService],
  exports: [TypeOrmModule],
})
export class GenresModule {}
