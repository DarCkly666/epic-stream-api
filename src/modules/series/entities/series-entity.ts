import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('series')
export class SeriesEntity {
  @PrimaryGeneratedColumn({ name: 'id_series' })
  idSeries: number;

  @Column({ length: 150 })
  title: string;

  @Column({ length: 250 })
  description: string;

  @Column({ name: 'release_date' })
  releaseDate: Date;

  @ManyToMany(() => GenreEntity, (genre) => genre.series, {
    cascade: false,
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'series_genre',
    joinColumn: { name: 'id_series', referencedColumnName: 'idSeries' },
    inverseJoinColumn: { name: 'id_genre', referencedColumnName: 'idGenre' },
  })
  genres: GenreEntity[];
}
