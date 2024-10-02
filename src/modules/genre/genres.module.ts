import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GenresService } from './services/genres.service';
import { GenresController } from './controllers/genres.controller';
import { Genre } from './entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
