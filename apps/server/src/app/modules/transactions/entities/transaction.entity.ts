import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../shared/abstract.entity';
import { TaskEntity } from '../../tasks/entities/task.entity';

@Entity('transactions')
export class TransactionEntity extends AbstractEntity {
  @Column({ type: 'string' })
  name: string;

  @Column({ type: 'string' })
  description: string;

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.id)
  tasks: TaskEntity;
}