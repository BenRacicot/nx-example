import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../../shared/abstract.entity';
import { TransactionEntity } from '../../transactions/entities/transaction.entity';
import { AgentEntity } from '../../agents/entities/agent.entity';


@Entity('task')
export class TaskEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'uuid' })
  agentId: string;

  @OneToOne(() => AgentEntity, (agent: AgentEntity) => agent.id)
  agent: AgentEntity;

  @Column({ type: 'uuid' })
  transactionId: string;

  @ManyToOne(() => TransactionEntity, (transaction: TransactionEntity) => transaction.id)
  transaction: TransactionEntity;
}