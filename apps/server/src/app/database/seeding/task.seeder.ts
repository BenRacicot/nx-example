import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { v7 as uuidv7 } from 'uuid';
import { faker } from '@faker-js/faker';

import { TaskEntity } from '../../modules/tasks/entities/task.entity';
import { AgentEntity } from '../../modules/agents/entities/agent.entity';
import { TransactionEntity } from '../../modules/transactions/entities/transaction.entity';

export function generateTasks(
  agentIds: string[] = [], 
  transactionIds: string[] = []
): TaskEntity[] {
  const tasks: TaskEntity[] = [];

  const count = Math.max(agentIds.length, 10);

  for (let i = 0; i < count; i++) {
    const task = new TaskEntity();
    task.id = uuidv7();
    task.createdAt = faker.date.past();
    task.updatedAt = faker.date.recent();
    task.name = faker.company.catchPhrase();
    task.description = faker.lorem.paragraph();
    tasks.push(task);
  }

  return tasks;
}

export class TaskSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    // First, get existing agents and transactions
    const agents = await dataSource.getRepository(AgentEntity).find();
    const transactions = await dataSource.getRepository(TransactionEntity).find();
    
    // Filter out any undefined IDs
    const agentIds = agents.map(agent => agent.id).filter((id): id is string => id !== undefined);
    const transactionIds = transactions.map(transaction => transaction.id).filter((id): id is string => id !== undefined);
    
    const tasks = generateTasks(agentIds, transactionIds);
    
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(TaskEntity)
      .values(tasks)
      .execute();
  }
}
