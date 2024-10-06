import { MovieEntity } from 'src/modules/movies/entities/movie.entity';
import { SeriesEntity } from 'src/modules/series/entities/series.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('genres')
export class GenreEntity {
  @PrimaryGeneratedColumn({ name: 'id_genre' })
  idGenre: number;

  @Column({ length: 100 })
  name: string;

  @ManyToMany(() => SeriesEntity, (series) => series.genres, {
    onDelete: 'CASCADE',
  })
  series: SeriesEntity[];

  @ManyToMany(() => MovieEntity, (movie) => movie.genres, {
    onDelete: 'CASCADE',
  })
  movies: MovieEntity[];
}
