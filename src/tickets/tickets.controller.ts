import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './createTicket.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UpdateTicketStatusDto } from './updateTicketStatus.dto';
import { AssignTicketDto } from './assignmentTicket.dto';

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

//rota para exibir todos tickets do usuario
@UseGuards(JwtAuthGuard)
@Get()
getAll(@Request() req){

 return this.ticketService.getAllTickets(req.user)

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

////rota para atribuir ticket 
@UseGuards(JwtAuthGuard)
@Patch(':ticketId/assign-user')
assignmentTicket(
  @Param('ticketId') ticketId: string,
  @Request() req,
  @Body() assignTicketDto: AssignTicketDto,
) {
  return this.ticketService.assignmentTicket(
    ticketId,
    req.user,
    assignTicketDto,
  );
}





}
