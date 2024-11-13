import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../../shared/abstract.entity';
import { TransactionEntity } from '../../transactions/entities/transaction.entity';
import { AgentEntity } from '../../agents/entities/agent.entity';


@Entity('task')
export class TaskEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name?: string;

  @Column({ type: 'varchar' })
  description?: string;

  @ManyToOne(() => AgentEntity, (agent: AgentEntity) => agent.tasks)
  agent?: AgentEntity;

  @ManyToOne(() => TransactionEntity, (transaction: TransactionEntity) => transaction.tasks)
  transaction?: TransactionEntity;
}