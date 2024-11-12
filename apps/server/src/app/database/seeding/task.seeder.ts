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
    task.agentId = agentIds[i % agentIds.length];
    task.transactionId = transactionIds[i % transactionIds.length];
    tasks.push(task);
  }

  return tasks;
}

export class TaskSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    // First, get existing agents and transactions
    const agents = await dataSource.getRepository(AgentEntity).find();
    const transactions = await dataSource.getRepository(TransactionEntity).find();
    
    const agentIds = agents.map(agent => agent.id);
    const transactionIds = transactions.map(transaction => transaction.id);
    
    const tasks = generateTasks(agentIds, transactionIds);
    
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(TaskEntity)
      .values(tasks)
      .execute();
  }
}
