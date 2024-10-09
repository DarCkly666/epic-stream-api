import { FavouriteSeriesEntity } from 'src/modules/favourites-series/entities/favourite-series.entity';
import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import { SeassonEntity } from 'src/modules/seassons/entities/seasson.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  OneToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ name: 'cover_url' })
  coverUrl: string;

  @Column({ name: 'banner_url', nullable: true })
  bannerUrl: string;

  @CreateDateColumn({
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @OneToMany(() => FavouriteSeriesEntity, (favourite) => favourite.series, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  favourites: FavouriteSeriesEntity[];

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

  @OneToMany(() => SeassonEntity, (seasson) => seasson.series, {
    onDelete: 'CASCADE',
  })
  seassons: SeassonEntity[];
}
