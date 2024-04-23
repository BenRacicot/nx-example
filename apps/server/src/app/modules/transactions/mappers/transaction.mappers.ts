import { TransactionEntity } from '../entities/transaction.entity';
import { ITransaction } from '@interfaces/transaction.interface';

export const mapTransactionEntitytoTransaction = (entity: TransactionEntity): ITransaction => {
  return {
    id: entity.id,
    name: entity.name,
    description: entity.description,
  };
};
