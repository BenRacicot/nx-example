import { DataSource } from 'typeorm';
import { Seeder, runSeeder } from 'typeorm-extension';

import { AgentSeeder } from './agent.seeder';
import { TransactionSeeder } from './transaction.seeder';
import { TaskSeeder } from './task.seeder';

export class MainSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    await runSeeder(dataSource, AgentSeeder);
    await runSeeder(dataSource, TransactionSeeder);
    await runSeeder(dataSource, TaskSeeder);
  }
}
