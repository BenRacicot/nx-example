import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

import { SnakeNamingStrategy } from './strategies/snake-naming.strategy';
import { MainSeeder } from './seeding/main.seeder';

dotenv.config({ path: 'apps/server/.env' });

export const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT!),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [],
  // logging: true, // https://github.com/typeorm/typeorm/blob/master/docs/logging.md#log-long-running-queries
  // logger: 'advanced-console',
  synchronize: false,
  migrationsRun: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../**/migrations/*{.ts,.js}'],
  seeds: [MainSeeder],
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  extra: {
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  },
};

const AppDataSource: DataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
