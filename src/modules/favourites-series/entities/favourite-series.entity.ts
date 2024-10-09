import { SeriesEntity } from 'src/modules/series/entities/series.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('favourites_series')
export class FavouriteSeriesEntity {
  @PrimaryGeneratedColumn({ name: 'id_favourite_series' })
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

  @ManyToOne(() => UserEntity, (user) => user.favouritesSeries)
  @JoinColumn({ name: 'id_user' })
  user: UserEntity;

  @ManyToOne(() => SeriesEntity, (series) => series.favourites)
  @JoinColumn({ name: 'id_series' })
  series: SeriesEntity;
}
