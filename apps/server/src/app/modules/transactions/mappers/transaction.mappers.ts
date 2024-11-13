import { TransactionEntity } from '../entities/transaction.entity';

import { ITransaction } from '@interfaces';

export const mapTransactionEntitytoTransaction = (entity: TransactionEntity): ITransaction=> {
  if (!entity.id) {
    throw new Error('An id is required for Task entity');
  }
  return {
    id: entity.id,
    name: entity.name || '',
    description: entity.description || '',
  };
};
