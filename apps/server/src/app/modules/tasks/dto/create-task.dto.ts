import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTaskDto {
  @ApiPropertyOptional({
    description: 'id',
    example: '3fe9de5a-75e0-44f4-9b35-e7bffaf0c872',
  })
  @IsOptional()
  @IsUUID() // <-- uuids (uuidv7) not numbered ids (its 2024)
  readonly id?: string;

  @ApiPropertyOptional({
    description: 'name',
    example: 'Ben Racicot',
  })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({
    description: 'description',
    example: 'This task is about ...',
  })
  @IsOptional()
  @IsString()
  readonly description?: string;
}
