import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from '../entities/genre.entity';
import { CreateGenreDto } from '../dtos/create-genre.dto';
import { UpdateGenreDto } from '../dtos/update-genre.dto';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Genre[]> {
    return this.genreRepository.find();
  }

  async findOne(id: number): Promise<Genre> {
    return this.genreRepository.findOneBy({ idGenre: id });
  }

  async create(createGenreDto: CreateGenreDto): Promise<Genre> {
    const genre = this.genreRepository.create(createGenreDto);
    return this.genreRepository.save(genre);
  }

  async update(id: number, updateGenreDto: UpdateGenreDto): Promise<Genre> {
    await this.genreRepository.update(id, updateGenreDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.genreRepository.delete(id);
  }
}
