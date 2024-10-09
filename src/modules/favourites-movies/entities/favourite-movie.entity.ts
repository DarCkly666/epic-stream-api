import { UserEntity } from 'src/modules/users/entities/user.entity';
import { MovieEntity } from 'src/modules/movies/entities/movie.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('favourites_movies')
export class FavouriteMovieEntity {
  @PrimaryGeneratedColumn({ name: 'id_favourite_movies' })
  idFavorite: number;

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

  @ManyToOne(() => UserEntity, (user) => user.favouritesMovies)
  @JoinColumn({ name: 'id_user' })
  user: UserEntity;

  @ManyToOne(() => MovieEntity, (movies) => movies.favourites)
  @JoinColumn({ name: 'id_movie' })
  movies: MovieEntity;
}
