import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './createTicket.dto';
import { UpdateTicketDto } from './updateTicket.dto';
import { LogService } from 'src/log/log.service';
import { UpdateTicketStatusDto } from './updateTicketStatus.dto';

@Injectable()
export class TicketsService {

    //constructor para instanciar coisas necessarias 
    constructor(private  prisma : PrismaService,
     private logService : LogService
     ) {}

    //metodos para ticket 
    
  //create ticket
async create(createTicketDto, userId : string){
     const ticket = await this.prisma.ticket.create({
        data :{ ...createTicketDto,
        createdById : userId }

    })

            // Ticket criado
    await this.logService.create(
    'Ticket criado',
    userId,
    ticket.id,
    );

    return {
        message : 'ticket criado com sucesso',
        ticket,
    }





}

//metodo updateStatus
async updateStatus (ticketId : string, user : any, updateStatus : UpdateTicketStatusDto){

    const TicketExists = await this.prisma.ticket.findUnique({
        where : {
            id: ticketId
        }
    })

    if(!TicketExists) {
        throw new NotFoundException('ticket não encontrado')
    }

    //verificacao da role 

    if(user.role === "USER"){
        //executa erro
        throw new ForbiddenException('Você não tem acesso a essa rota')
    }

    //atualizando status 
    const statusUpdated = await this.prisma.ticket.update({
        where : {
            id : ticketId
        },
        data : {
            status : updateStatus.status
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

  // 3b23a9f0-7bca-42d0-8ea9-bbcf270a4804 id do ticket para teste




}







}
