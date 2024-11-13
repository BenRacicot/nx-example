import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { v7 as uuidv7 } from 'uuid';

import { TransactionEntity } from '../../modules/transactions/entities/transaction.entity';

export class TransactionSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const transactions = generateTransactions();
    await dataSource
      .createQueryBuilder()
      .insert()
      .into(TransactionEntity)
      .values(transactions)
      .execute();
  }
}

export function generateTransactions(count: number = 10): TransactionEntity[] {
  const transactions: TransactionEntity[] = [];

  for (let i = 0; i < count; i++) {
    const transaction = new TransactionEntity();
    transaction.id = uuidv7();
    transaction.createdAt = faker.date.past();
    transaction.updatedAt = faker.date.recent();
    transaction.name = faker.person.fullName();
    transaction.description = faker.lorem.sentence();
    transactions.push(transaction);
  }

  return transactions;
}