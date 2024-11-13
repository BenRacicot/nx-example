import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';

import { TaskEntity } from '../../modules/tasks/entities/task.entity';
import { AgentEntity } from '../../modules/agents/entities/agent.entity';
import { TransactionEntity } from '../../modules/transactions/entities/transaction.entity';
import { mockTasks } from './mock-data';

export class TaskSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const taskRepository = dataSource.getRepository(TaskEntity);
    
    // Check for existing data
    const existingTasks = await taskRepository.count();
    if (existingTasks > 0) {
      console.log('Tasks already seeded');
      return;
    }

    // Get agents and transactions for relationships
    const agents = await dataSource.getRepository(AgentEntity).find();
    const transactions = await dataSource.getRepository(TransactionEntity).find();

    if (!agents.length || !transactions.length) {
      throw new Error('Agents and Transactions must be seeded before Tasks');
    }

    // Convert mock data to entities and assign relationships
    const tasks = mockTasks.map((t, index) => {
      const task = new TaskEntity();
      task.id = t.id;
      task.name = t.name;
      task.description = t.description;
      task.createdAt = new Date(t.createdAt);
      task.updatedAt = new Date(t.updatedAt);
      
      // Distribute agents and transactions evenly across tasks
      task.agent = agents[index % agents.length];
      task.transaction = transactions[index % transactions.length];
      
      return task;
    });

    try {
      await taskRepository.save(tasks);
      console.log(`Seeded ${tasks.length} tasks`);
    } catch (error) {
      console.error('Error seeding tasks:', error);
    }
  }
}

// export function generateTasks(
//   agentIds: string[] = [], 
//   transactionIds: string[] = []
// ): TaskEntity[] {
//   const tasks: TaskEntity[] = [];

//   const count = Math.max(agentIds.length, 10);

//   for (let i = 0; i < count; i++) {
//     const task = new TaskEntity();
//     task.id = uuidv7();
//     task.createdAt = faker.date.past();
//     task.updatedAt = faker.date.recent();
//     task.name = faker.company.catchPhrase();
//     task.description = faker.lorem.paragraph();
//     tasks.push(task);
//   }

//   return tasks;
// }

// export class TaskSeeder implements Seeder {
//   async run(dataSource: DataSource): Promise<void> {
//     // First, get existing agents and transactions
//     const agents = await dataSource.getRepository(AgentEntity).find();
//     const transactions = await dataSource.getRepository(TransactionEntity).find();
    
//     // Filter out any undefined IDs
//     const agentIds = agents.map(agent => agent.id).filter((id): id is string => id !== undefined);
//     const transactionIds = transactions.map(transaction => transaction.id).filter((id): id is string => id !== undefined);
    
//     const tasks = generateTasks(agentIds, transactionIds);
    
//     await dataSource
//       .createQueryBuilder()
//       .insert()
//       .into(TaskEntity)
//       .values(tasks)
//       .execute();
//   }
// }
