import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './modules/tasks/tasks.module';
import { TaskEntity } from './modules/tasks/entities/task.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), DatabaseModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
