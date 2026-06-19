import { IsString, IsEnum } from 'class-validator';
import { Priority } from '@prisma/client';

export class CreateTicketDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsEnum(Priority)
  priority!: Priority;
}