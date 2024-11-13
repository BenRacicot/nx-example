import { DataSource } from 'typeorm';
import { Seeder, runSeeder } from 'typeorm-extension';

import { AgentSeeder } from './agent.seeder';
import { TransactionSeeder } from './transaction.seeder';
import { TaskSeeder } from './task.seeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    try {
      // Run seeders in sequence
      console.log('🌱 Starting database seeding...');
      
      console.log('Seeding agents...');
      await runSeeder(dataSource, AgentSeeder);
      
      console.log('Seeding transactions...');
      await runSeeder(dataSource, TransactionSeeder);
      
      console.log('Seeding tasks...');
      await runSeeder(dataSource, TaskSeeder);
      
      console.log('✅ Database seeding completed successfully');
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      throw error; // Re-throw to ensure the seeding process fails properly
    }
  }
}