import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { faker } from '@faker-js/faker';
import { v7 as uuidv7 } from 'uuid';

import { TransactionEntity } from '../../modules/transactions/entities/transaction.entity';
import { mockTransactions } from './mock-data';

export class TransactionSeeder implements Seeder {
  async run(dataSource: DataSource): Promise<void> {
    const transactionRepository = dataSource.getRepository(TransactionEntity);
    
    // Check for existing data
    const existingTransactions = await transactionRepository.count();
    if (existingTransactions > 0) {
      console.log('Transactions already seeded');
      return;
    }

    // Convert mock data to entities
    const transactions = mockTransactions.map(tx => {
      const transaction = new TransactionEntity();
      transaction.id = tx.id;
      transaction.name = tx.name;
      transaction.description = tx.description;
      transaction.createdAt = new Date(tx.createdAt);
      transaction.updatedAt = new Date(tx.updatedAt);
      return transaction;
    });

    try {
      await transactionRepository.save(transactions);
      console.log(`Seeded ${transactions.length} transactions`);
    } catch (error) {
      console.error('Error seeding transactions:', error);
    }
  }
}


// export class TransactionSeeder implements Seeder {
//   async run(dataSource: DataSource): Promise<void> {
//     const transactions = generateTransactions();
//     await dataSource
//       .createQueryBuilder()
//       .insert()
//       .into(TransactionEntity)
//       .values(transactions)
//       .execute();
//   }
// }

// export function generateTransactions(count: number = 10): TransactionEntity[] {
//   const transactions: TransactionEntity[] = [];

//   for (let i = 0; i < count; i++) {
//     const transaction = new TransactionEntity();
//     transaction.id = uuidv7();
//     transaction.createdAt = faker.date.past();
//     transaction.updatedAt = faker.date.recent();
//     transaction.name = faker.person.fullName();
//     transaction.description = faker.lorem.sentence();
//     transactions.push(transaction);
//   }

//   return transactions;
// }