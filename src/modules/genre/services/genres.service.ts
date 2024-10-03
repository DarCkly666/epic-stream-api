import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GenreEntity } from '../entities/genre.entity';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import { UpdateGenreDto } from '../dtos/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genreRepository: Repository<GenreEntity>,
  ) {}

  async findAll(): Promise<GenreEntity[]> {
    return this.genreRepository.find();
  }

  async findOne(id: number): Promise<GenreEntity> {
    const genre = await this.genreRepository.findOneBy({ idGenre: id });
    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found.`);
    }
    return genre;
  }

  async create(createGenreDto: CreateGenreDto): Promise<GenreEntity> {
    const genre = this.genreRepository.create(createGenreDto);
    return this.genreRepository.save(genre);
  }

  async update(
    id: number,
    updateGenreDto: UpdateGenreDto,
  ): Promise<GenreEntity> {
    await this.findOne(id);
    await this.genreRepository.update(id, updateGenreDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.genreRepository.delete(id);
  }
}
