import { IsString, IsOptional } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}