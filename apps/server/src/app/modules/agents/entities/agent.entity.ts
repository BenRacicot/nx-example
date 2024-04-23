import { Column, Entity, OneToOne } from 'typeorm';

import { AbstractEntity } from '../../../shared/abstract.entity';
import { TaskEntity } from '../../tasks/entities/task.entity';


@Entity('agent')
export class AgentEntity extends AbstractEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'uuid' })
  taskId: string;

  @OneToOne(() => TaskEntity, (task: TaskEntity) => task.id)
  task: TaskEntity;
}

