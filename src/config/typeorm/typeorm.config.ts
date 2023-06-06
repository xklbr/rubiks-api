import { ConnectionOptions } from 'typeorm-seeding';
import * as dotenv from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

dotenv.config({ path: '.env' });

const config: ConnectionOptions & TypeOrmModuleOptions = {
  name: 'default',
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  autoLoadEntities: true,
  synchronize: true,
  entities: [__dirname + './../../**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/**/*{.ts,.js}'],
  seeds: ['src/database/seeds/*{.ts,.js}'],
  factories: [],
};

export default config;
