import { IsEmail } from 'class-validator';

export class AssignTicketDto {
  @IsEmail()
  email!: string;
} 