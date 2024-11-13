import { ITask } from "@interfaces";

import { TaskEntity } from "../entities/task.entity";
import { mapTransactionEntitytoTransaction } from "../../transactions/mappers/transaction.mappers";
import { CreateTaskDto } from "apps/server/src/app/modules/tasks/dto/create-task.dto";

export const mapCreateTaskDataToTaskEntity = (req: CreateTaskDto): TaskEntity => {
  const entity: TaskEntity = new TaskEntity();
  entity.id = '123e4567-e89b-12d3-a456-426614174000'; // uuidv7

  entity.name = req.name;
  entity.description = req.description;

  return entity;
};

export const mapTaskEntityToTask = (entity: TaskEntity): ITask => {
  if (!entity.transaction) {
    throw new Error('Transaction is required for Task entity');
  }
  if (!entity.id) {
    throw new Error('An id is required for Task entity');
  }

  return {
    id: entity?.id,
    name: entity?.name || '',
    description: entity?.description || '',
    agent: entity?.agent,
    transaction: mapTransactionEntitytoTransaction(entity?.transaction),
  }
}