import { EpisodeEntity } from 'src/modules/episodes/entities/episode.entity';
import { SeriesEntity } from 'src/modules/series/entities/series.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity('seassons')
export class SeassonEntity {
  @PrimaryGeneratedColumn({ name: 'id_seasson' })
  idSeasson: number;

  @Column()
  name: string;

  @Column({ name: 'seasson_number', type: 'int' })
  seassonNumber: number;

  @ManyToOne(() => SeriesEntity, (series) => series.seassons)
  @JoinColumn({ name: 'id_series' })
  series: SeriesEntity;

  @OneToMany(() => EpisodeEntity, (episode) => episode.seasson, {
    onDelete: 'CASCADE',
  })
  episodes: EpisodeEntity[];
}
