import { Body, Controller, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './createTicket.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UpdateTicketStatusDto } from './updateTicketStatus.dto';

@Controller('tickets')
export class TicketsController {

    //constructor para trazer o service
    constructor(
        private ticketService : TicketsService,
    ) {}

    //definicao das rotas

//rota create
@UseGuards(JwtAuthGuard)
@Post('create')
create(@Body() createTicketDto :  CreateTicketDto, @Request() req,){
    return this.ticketService.create(
        createTicketDto,
        req.user.sub
    )
}

//rota para atualizar status
@UseGuards(JwtAuthGuard)
@Patch(":ticketId/status")
updateStatus(@Param('ticketId') ticketId : string,
@Request() req,
@Body() updateStatusDto : UpdateTicketStatusDto,
){
    return this.ticketService.updateStatus(
        ticketId,
        req.user,
        updateStatusDto
    )
}

//rota para assumir ticket 
@UseGuards(JwtAuthGuard)
@Patch(":ticketId/assign")
assignTicket(
    @Param('ticketId') ticketId : string,
    @Request() req ,
){
    return  this.ticketService.assignTicket(
        ticketId,
        req.user
    )
}





}
