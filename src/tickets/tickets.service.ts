import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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





}


//assumir ticket

async assignTicket(ticketId : string, user : any){

    const TicketExists = await this.prisma.ticket.findUnique({
        where : {
            id : ticketId
        }
    })


    if(!TicketExists){
        throw new NotFoundException("ticket não encontrado")
    }

    //permissao de role
    if (user.role === 'USER') {
    throw new ForbiddenException(
        'Você não tem permissão para assumir tickets',
    );
    }


    if(TicketExists.assignedToId != null){
        throw new ConflictException("esse ticket já está atribuido")
    }

    //assumindo ticket e mudando status
    const assignedTicket = await this.prisma.ticket.update({
        where : {
            id : ticketId
        },
        data : {
            assignedToId : user.sub,
            status : "IN_PROGRESS"
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







}
