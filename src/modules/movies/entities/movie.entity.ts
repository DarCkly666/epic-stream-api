import { GenreEntity } from 'src/modules/genre/entities/genre.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn({ name: 'id_movie' })
  idMovie: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  banner: string;

  @Column({ name: 'release_date' })
  releaseDate: Date;

  @Column()
  duration: number;

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

  @ManyToMany(() => GenreEntity, (genre) => genre.movies)
  @JoinTable({
    name: 'movies_genres',
    joinColumn: { name: 'id_movie', referencedColumnName: 'idMovie' },
    inverseJoinColumn: { name: 'id_genre', referencedColumnName: 'idGenre' },
  })
  genres: GenreEntity[];
}
