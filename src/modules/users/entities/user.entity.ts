import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';
import { Role } from './role.enum';

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
}
