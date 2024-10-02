import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn({ name: 'id_genre' })
  idGenre: number;

  @Column({ length: 100 })
  name: string;
}
