import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../shared/abstract.entity';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { AgentEntity } from '../../agents/entities/agent.entity';

@Entity('transactions')
export class TransactionEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name?: string;

  @Column({ type: 'text' })
  description?: string;

  @ManyToOne(() => AgentEntity, (agent: AgentEntity) => agent.transactions)
  agent?: AgentEntity;

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.transaction)
  tasks?: TaskEntity[];
}