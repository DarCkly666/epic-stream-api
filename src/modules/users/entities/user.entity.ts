import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
} from 'typeorm';
import { Role } from './role.enum';
import { FavouriteSeriesEntity } from 'src/modules/favourites-series/entities/favourite-series.entity';
import { FavouriteMovieEntity } from 'src/modules/favourites-movies/entities/favourite-movie.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id_user' })
  idUser: number;

  @Column({ name: 'username', unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'role', type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ name: 'active', default: true })
  active: boolean;

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

  @OneToMany(() => FavouriteSeriesEntity, (favourite) => favourite.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  favouritesSeries: FavouriteSeriesEntity[];

  @OneToMany(() => FavouriteMovieEntity, (favourite) => favourite.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  favouritesMovies: FavouriteMovieEntity[];
}
