import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTicketDto } from './createTicket.dto';
import { UpdateTicketDto } from './updateTicket.dto';

@Injectable()
export class TicketsService {

    //constructor para instanciar coisas necessarias 
    constructor(private  prisma : PrismaService ) {
    }

    //metodos para ticket 
    
  //create ticket
async create(createTicketDto, userId : string){
     const ticket = await this.prisma.ticket.create({
        data :{ ...createTicketDto,
        createdById : userId }

    })

    return {
        message : 'ticket criado com sucesso',
        ticket,
    }




}





}
