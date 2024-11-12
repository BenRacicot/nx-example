import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
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
