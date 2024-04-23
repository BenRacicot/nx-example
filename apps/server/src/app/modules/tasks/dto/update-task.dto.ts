import { PartialType } from '@nestjs/mapped-types';

class CreateTaskDto {
  name: string;
  description: string;
  agent?: {
    id?: number;
  }; 
  transaction: {
    id: number;
  };
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {} 
