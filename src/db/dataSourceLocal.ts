import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const connectionOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'choutzuyu',
  database: 'db_epicstream',
  // entities: [Genre],
  // entities: ['src/**/*.entity{.ts,.js}'],
  synchronize: true,
  dropSchema: false,
  autoLoadEntities: true,
  logging: true,
  subscribers: [],
  // migrations: ['src/db/migrations/*{.ts,.js}'],
};
