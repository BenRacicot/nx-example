import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { AgentEntity } from '../../modules/agents/entities/agent.entity';
import { mockAgents } from './mock-data'; // Adjust the import path as needed

export class AgentSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const agentRepository = dataSource.getRepository(AgentEntity);
    
    // First check if we already have data to avoid duplicates
    const existingAgents = await agentRepository.count();
    if (existingAgents > 0) {
      console.log('Agents already seeded');
      return;
    }

    // Convert mock data to entity instances
    const agents = mockAgents.map(mockAgent => {
      const agent = new AgentEntity();
      agent.id = mockAgent.id;
      agent.name = mockAgent.name;
      agent.createdAt = new Date(mockAgent.createdAt);
      agent.updatedAt = new Date(mockAgent.updatedAt);
      return agent;
    });

    // Insert all agents
    try {
      await agentRepository.save(agents);
      console.log(`Seeded ${agents.length} agents`);
    } catch (error) {
      console.error('Error seeding agents:', error);
    }
  }
}

// export class AgentSeeder implements Seeder {
//   async run(dataSource: DataSource): Promise<void> {
//     // First, get existing tasks
//     const tasks = await dataSource.getRepository(TaskEntity).find();
//     const taskIds = tasks.map(task => task.id).filter((id): id is string => id !== undefined);;
//     const agents = generateAgents(taskIds);
    
//     await dataSource
//       .createQueryBuilder()
//       .insert()
//       .into(AgentEntity)
//       .values(agents)
//       .execute();
//   }
// }

// export function generateAgents(taskIds: string[] = []): AgentEntity[] {
//   const agents: AgentEntity[] = [];
//   const count = Math.max(taskIds.length, 10);

//   for (let i = 0; i < count; i++) {
//     const agent = new AgentEntity();
//     agent.id = uuidv7();
//     agent.createdAt = faker.date.past();
//     agent.updatedAt = faker.date.recent();
//     agent.name = faker.person.fullName();
    
//     agents.push(agent);
//   }

//   return agents;
// }

