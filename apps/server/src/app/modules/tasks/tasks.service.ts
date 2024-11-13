import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { mapCreateTaskDataToTaskEntity, mapTaskEntityToTask } from './mappers/task-entity.mapper';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from '@interfaces';

@Injectable()
export class TasksService {

  constructor(@InjectRepository(TaskEntity) private repository: Repository<TaskEntity>) { }

  // https://orkhan.gitbook.io/typeorm/docs/repository-api#repository-api
  async create(req: CreateTaskDto): Promise<ITask> {
    const taskCandidate = mapCreateTaskDataToTaskEntity(req);

    const entity = await this.repository.save(taskCandidate);

    return mapTaskEntityToTask(entity);
  }

  async findOne(id: string): Promise<ITask> {
    const entity = await this.repository.findOne({
      where: { id },
      select: ['transaction']
    });
  
    if (!entity) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  
    return mapTaskEntityToTask(entity);
  }

  async update(id: string, req: UpdateTaskDto): Promise<ITask> {
    // First check if the task exists
    const task = await this.repository.findOne({ where: { id } });
    
    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    // Update the entity with the new data
    const updatedTask = await this.repository.save({
      ...task,
      ...req,
      id // Ensure ID remains unchanged
    });

    return mapTaskEntityToTask(updatedTask);
  }
}