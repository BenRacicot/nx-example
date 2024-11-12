import { ITask } from "@interfaces/task.interface";

import { TaskEntity } from "../entities/task.entity";
import { mapTransactionEntitytoTransaction } from "../../transactions/mappers/transaction.mappers";
import { CreateTaskDto } from "apps/server/src/app/modules/tasks/dto/create-task.dto";

export const mapCreateTaskDataToTaskEntity = (req: CreateTaskDto): TaskEntity => {
  const entity: TaskEntity = new TaskEntity();
  entity.id = 'abcdef'; // uuidv7

  entity.name = req.name;
  entity.description = req.description;

  return entity;
};

export const mapTaskEntityToTask = (entity: TaskEntity): ITask => {
  return {
    id: entity?.id,
    name: entity?.name,
    description: entity?.description,
    agent: {
      id: entity?.agentId,
    },
    transaction: mapTransactionEntitytoTransaction(entity?.transaction),
  }
}