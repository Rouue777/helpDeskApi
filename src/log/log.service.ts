import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogService {
    //instanciando dependencias
    constructor(
        private prisma : PrismaService
    ){}

    //criando metodos
async create(
  action: string,
  userId: string,
  ticketId: string,
){
 return this.prisma.log.create({
    data: {
      action,
      userId,
      ticketId,
    },
  });
}

//exibindo logs do ticket
async getLogsByTicket(ticketId: string) {
  // Verifica se o ticket existe
  const ticketExists = await this.prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  if (!ticketExists) {
    throw new NotFoundException('Ticket não encontrado');
  }

  const logs = await this.prisma.log.findMany({
    where: {
      ticketId,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  return {
    message: 'Logs encontrados',
    logs,
  };
}


}
