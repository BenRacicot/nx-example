import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { v7 as uuidv7 } from 'uuid';

import { AgentEntity } from '../../modules/agents/entities/agent.entity';
import { TaskEntity } from '../../modules/tasks/entities/task.entity';

export class AgentSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    // First, get existing tasks
    const tasks = await dataSource.getRepository(TaskEntity).find();
    const taskIds = tasks.map(task => task.id);
    
    const agents = generateAgents(taskIds);
    
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(AgentEntity)
      .values(agents)
      .execute();
  }
}

export function generateAgents(taskIds: string[] = []): AgentEntity[] {
  const agents: AgentEntity[] = [];
  const count = Math.max(taskIds.length, 10);

  for (let i = 0; i < count; i++) {
    const agent = new AgentEntity();
    agent.id = uuidv7();
    agent.createdAt = faker.date.past();
    agent.updatedAt = faker.date.recent();
    agent.name = faker.person.fullName();
    agent.taskId = taskIds[i % taskIds.length];
    agents.push(agent);
  }

  return agents;
}

