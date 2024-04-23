import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ITask } from '@interfaces/task.interface';
import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { mapCreateTaskDataToTaskEntity, mapTaskEntityToTask } from './mappers/task-entity.mapper';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(TaskEntity) private repository: Repository<TaskEntity>) { }

  // https://orkhan.gitbook.io/typeorm/docs/repository-api#repository-api
  async create(data: CreateTaskDto): Promise<ITask> {
    const taskCandidate = mapCreateTaskDataToTaskEntity(data);

    const entity = await this.repository.save(taskCandidate);

    return mapTaskEntityToTask(entity);
  }

  async findOne(id: string): Promise<TaskEntity> {
    return await this.repository.findOne({
      where: { id },
      select: ['transaction']
    });
  }
}
