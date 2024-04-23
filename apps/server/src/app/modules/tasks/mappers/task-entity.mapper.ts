import { ITask } from "@interfaces/task.interface";
import { CreateTaskDto } from "../dto/create-task.dto";
import { TaskEntity } from "../entities/task.entity";
import { mapTransactionEntitytoTransaction } from "../../transactions/mappers/transaction.mappers";

export const mapCreateTaskDataToTaskEntity = (requestBody: CreateTaskDto): TaskEntity => {
  const entity: TaskEntity = new TaskEntity();

  if (requestBody.id) {
    entity.id = requestBody.id;
  }

  entity.name = requestBody.name;
  entity.description = requestBody.description;

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