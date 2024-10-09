import { SeassonEntity } from 'src/modules/seassons/entities/seasson.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('episodes')
export class EpisodeEntity {
  @PrimaryGeneratedColumn({ name: 'id_episode' })
  idEpisode: number;

  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'duration' })
  duration: number;

  @Column({ name: 'episode_number' })
  episodeNumber: number;

  @Column({ name: 'stream_url' })
  streamUrl: string;

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

  @ManyToOne(() => SeassonEntity, (seasson) => seasson.episodes)
  @JoinColumn({ name: 'id_seasson' })
  seasson: SeassonEntity;
}
