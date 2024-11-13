import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../../shared/abstract.entity';
import { TaskEntity } from '../../tasks/entities/task.entity';
import { TransactionEntity } from '../../transactions/entities/transaction.entity';


@Entity('agent')
export class AgentEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name?: string;

  @OneToMany(() => TransactionEntity, (transaction: TransactionEntity) => transaction.agent)
  transactions?: TransactionEntity[];

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.agent)
  tasks?: TaskEntity[];  
}