import { Column, Entity, OneToMany } from 'typeorm';

import { AbstractEntity } from '../../../shared/abstract.entity';
import { TaskEntity } from '../../tasks/entities/task.entity';

@Entity('transactions')
export class TransactionEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name?: string;

  @Column({ type: 'text' })
  description?: string;

  @OneToMany(() => TaskEntity, (task: TaskEntity) => task.id)
  tasks?: TaskEntity;
}