import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './createTicket.dto';
import { UpdateTicketDto } from './updateTicket.dto';
import { LogService } from 'src/log/log.service';
import { UpdateTicketStatusDto } from './updateTicketStatus.dto';
import { AssignTicketDto } from './assignmentTicket.dto';
import { Priority } from '@prisma/client';

@Injectable()
export class TicketsService {

    //constructor para instanciar coisas necessarias 
    constructor(private prisma: PrismaService,
        private logService: LogService
    ) { }

    //metodos para ticket 

    //create ticket
    async create(createTicketDto, userId: string) {
        const ticket = await this.prisma.ticket.create({
            data: {
                ...createTicketDto,
                createdById: userId
            }

        })

        // Ticket criado
        await this.logService.create(
            'Ticket criado',
            userId,
            ticket.id,
        );

        return {
            message: 'ticket criado com sucesso',
            ticket,
        }





    }


    //exibir todos tickets
    async getAllTickets(user: any) {

        const tickets = await this.prisma.ticket.findMany({
            where: {
                createdById: user.sub
            },
            orderBy: {
                createdAt: 'desc',
            },
        })


        if (tickets.length === 0) {
            throw new NotFoundException(
                "Usuário não possui tickets",
            );
        }

        return {
            message: "retorno correto",
            ticketList: tickets
        }


    }


    //exibir ticket pelo id
    async getTicketById(user: any, ticketId: string) {


        //logica para SUPPORT ADMIN
        if (user.role === "SUPPORT" || user.role === "ADMIN") {
            const ticket = await this.prisma.ticket.findFirst({
                where: {
                    id: ticketId
                }
            })
            if (!ticket) {
                throw new NotFoundException('Ticket não encontrado');
            }

            return {
                message: 'Ticket encontrado',
                ticket,
            };

        }

        //logica para user 
        if (user.role === "USER") {
            const ticket = await this.prisma.ticket.findFirst({
                where: {
                    id: ticketId,
                    createdById: user.sub
                }
            })

            if (!ticket) {
                throw new NotFoundException('Ticket não encontrado');
            }

            return {
                message: 'Ticket encontrado',
                ticket,
            };

        }



    }


    ///exibir ticket pela prioridade (só para SUPPORT E ADMIN)
    async getTicketByPriority (user : any , priority : Priority){
       
       
       if(user.role === "USER"){
        throw new ForbiddenException('você não possui essa permissão para acessar tickets dessa forma')
       }
        const tickets =  await this.prisma.ticket.findMany({
            where : {
                priority : priority
            }
        })

        if(tickets.length === 0){
            throw new NotFoundException(`nenhum ticket com prioridade : ${priority} foi encontrado`)
        }

        return {
            message : "retorno correto",
            tickets
        }
    }

    //metodo updateStatus
    async updateStatus(ticketId: string, user: any, updateStatus: UpdateTicketStatusDto) {

        const TicketExists = await this.prisma.ticket.findUnique({
            where: {
                id: ticketId
            }
        })

        if (!TicketExists) {
            throw new NotFoundException('ticket não encontrado')
        }

        //verificacao da role 

        if (user.role === "USER") {
            //executa erro
            throw new ForbiddenException('Você não tem acesso a essa rota')
        }

        //atualizando status 
        const statusUpdated = await this.prisma.ticket.update({
            where: {
                id: ticketId
            },
            data: {
                status: updateStatus.status
            }
        })


        //gerar log
        await this.logService.create(
            `Status atualizado para ${updateStatus.status}`,
            user.sub,
            ticketId
        )

        return {
            message: 'Status atualizado com sucesso',
            ticket: statusUpdated,
        };





    }


    //assumir ticket

    async assignTicket(ticketId: string, user: any) {

        const TicketExists = await this.prisma.ticket.findUnique({
            where: {
                id: ticketId
            }
        })


        if (!TicketExists) {
            throw new NotFoundException("ticket não encontrado")
        }

        //permissao de role
        if (user.role === 'USER') {
            throw new ForbiddenException(
                'Você não tem permissão para assumir tickets',
            );
        }


        if (TicketExists.assignedToId != null) {
            throw new ConflictException("esse ticket já está atribuido")
        }

        //assumindo ticket e mudando status
        const assignedTicket = await this.prisma.ticket.update({
            where: {
                id: ticketId
            },
            data: {
                assignedToId: user.sub,
                status: "IN_PROGRESS"
            }
        })

        //criando log
        await this.logService.create(
            `ticket assumido por ${user.name}`,
            user.sub,
            ticketId
        )


        return {
            message: `Ticket assumido com sucesso por ${user.name}`,
            ticket: assignedTicket,
        };


    }

    /////admin atribui ticket

    async assignmentTicket(
        ticketId: string,
        user: any,
        assignTicketDto: AssignTicketDto,
    ) {
        // Apenas ADMIN pode atribuir tickets
        if (user.role !== 'ADMIN') {
            throw new ForbiddenException(
                'Sua role não permite esse tipo de interação',
            );
        }

        // Verifica se o ticket existe
        const ticketExists = await this.prisma.ticket.findUnique({
            where: {
                id: ticketId,
            },
        });

        if (!ticketExists) {
            throw new NotFoundException('Ticket não encontrado');
        }

        // Verifica se o usuário existe
        const userExists = await this.prisma.user.findUnique({
            where: {
                email: assignTicketDto.email,
            },
        });

        if (!userExists) {
            throw new NotFoundException('Usuário não encontrado');
        }

        if (userExists.role === 'USER') {
            throw new ForbiddenException(
                'Este usuário não pode receber tickets',
            );
        }

        // Atualiza o ticket
        const assignedTicket = await this.prisma.ticket.update({
            where: {
                id: ticketId,
            },
            data: {
                assignedToId: userExists.id,
                status: 'IN_PROGRESS',
            },
        });

        // Cria o log
        await this.logService.create(
            `Ticket atribuído para ${userExists.name}`,
            user.sub,
            ticketId,
        );

        return {
            message: 'Ticket atribuído com sucesso',
            ticket: assignedTicket,
        };
    }



//fechar ticket 
async closeTicket(
  ticketId: string,
  user: any,
) {
  // Verifica se o ticket existe
  const ticketExists = await this.prisma.ticket.findUnique({
    where: {
      id: ticketId,
    },
  });

  if (!ticketExists) {
    throw new NotFoundException('Ticket não encontrado');
  }

  // Apenas SUPPORT e ADMIN podem fechar tickets
  if (user.role === 'USER') {
    throw new ForbiddenException(
      'Você não possui permissão para fechar tickets',
    );
  }

  // Verifica se o ticket já está fechado
  if (ticketExists.status === 'CLOSED') {
    throw new ConflictException(
      'Este ticket já está fechado',
    );
  }

  // Fecha o ticket
  const closedTicket = await this.prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      status: 'CLOSED',
    },
  });

  // Cria log
  await this.logService.create(
    'Ticket fechado',
    user.sub,
    ticketId,
  );

  return {
    message: 'Ticket fechado com sucesso',
    ticket: closedTicket,
  };
}


}
