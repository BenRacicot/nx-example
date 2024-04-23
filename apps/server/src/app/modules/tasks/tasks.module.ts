import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TaskEntity } from './entities/task.entity';
import { TransactionEntity } from '../transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity, TransactionEntity])],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {
  
}
