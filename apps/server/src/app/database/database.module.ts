import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource, getMetadataArgsStorage } from 'typeorm';
import AppDataSource, { dataSourceOptions } from './typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions,
    }),
  ],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        await AppDataSource.setOptions({
          entities: getMetadataArgsStorage().tables.map((table) => table.target),
        });
        await AppDataSource.initialize();
        return AppDataSource;
      },
    },
  ],
  exports: [DataSource],
})
export class DatabaseModule {}