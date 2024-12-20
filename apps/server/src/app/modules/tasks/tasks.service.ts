import { Injectable, NotFoundException } from '@nestjs/common';
import { getManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskEntity } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import {
  mapCreateTaskDataToTaskEntity,
  mapTaskEntityToTask,
} from './mappers/task-entity.mapper';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ITask } from '@interfaces';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskEntity) private repository: Repository<TaskEntity>,
  ) {}

  // https://orkhan.gitbook.io/typeorm/docs/repository-api#repository-api
  async create(req: CreateTaskDto): Promise<ITask> {
    const taskCandidate = mapCreateTaskDataToTaskEntity(req);

    const entity = await this.repository.save(taskCandidate);

    return mapTaskEntityToTask(entity);
  }

  // THIS IS THE MAIN POINT OF THIS REPO
  async findOne(id: string): Promise<ITask> {
    // using TypeORM (or any ORM) is now standard practice
    const entity: TaskEntity | null = await this.repository.findOne({
      where: { id },
      relations: {
        transaction: true,
        agent: true,
      },
      select: {
        // task fields you need
        id: true,
        name: true,
        description: true,
      },
    });

    // Option 2: Using QueryBuilder
    // for slightly lower-level, SQL-like flexibility
    // const entity: TaskEntity | null = await this.repository
    //   .createQueryBuilder('task')
    //   .leftJoinAndSelect('task.transaction', 'transaction')
    //   .leftJoinAndSelect('task.agent', 'agent')
    //   .select([
    //     // only the props you want returned
    //     'task.id',
    //     'task.name',
    //     'task.description',
    //     'agent.id',
    //     'transaction.id'
    //   ])
    //   .where('task.id = :id', { id })
    //   .getOne();    

    // recommendation: when your queries get complicated (like options 3 and 4) encapsulate them in a helper service pattern
    // const entity: TaskEntity | null = await this.taskHelperService.complexQuery();

    // Option 3: Raw SQL using DataSource - add in ctor @InjectDataSource() private dataSource: DataSource
    // const entity: TaskEntity | null = await this.dataSource.query(`
    //   SELECT 
    //     t.id,
    //     t.name,
    //     t.description,
    //     a.id as agent_id,
    //     tr.id as transaction_id
    //   FROM tasks t
    //   LEFT JOIN agents a ON t.agent_id = a.id
    //   LEFT JOIN transactions tr ON t.transaction_id = tr.id
    //   WHERE t.id = $1
    // `, [id]);

    // Option 4: Transaction with raw SQL
    // await this.dataSource.transaction(async transactionalManager => {
    //   const entities: TaskEntity[] | null  = await transactionalManager.query(`
    //     SELECT * FROM tasks
    //     WHERE id = $1
    //     FOR UPDATE
    //   `, [id]);

    //   if (entities.length > 0) {
    //     await transactionalManager.query(`
    //       UPDATE tasks
    //       SET last_accessed = NOW()
    //       WHERE id = $1
    //     `, [id]);
    //   }
    // });

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
      id, // Ensure ID remains unchanged
    });

    return mapTaskEntityToTask(updatedTask);
  }
}
