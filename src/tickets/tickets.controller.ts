import { Body, Controller, Get, Param, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './createTicket.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { UpdateTicketStatusDto } from './updateTicketStatus.dto';
import { AssignTicketDto } from './assignmentTicket.dto';
import { Priority } from '@prisma/client';

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

//rota para exibir ticket por priority
@UseGuards(JwtAuthGuard)
@Get('/filter')
getTickets(
  @Request() req,
  @Query('priority') priority: Priority,
) {
    console.log(priority)
  return this.ticketService.getTicketByPriority(req.user, priority);
}


//rota para exibir tickerporId
@UseGuards(JwtAuthGuard)
@Get(":ticketId")
getTicketById(
    @Param('ticketId') ticketId : string,
    @Request() req  
){

    return this.ticketService.getTicketById(req.user, ticketId)
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


//rota para fecahr o ticket 
@UseGuards(JwtAuthGuard)
@Patch(':ticketId/close')
closeTicket(
  @Param('ticketId') ticketId: string,
  @Request() req,
) {
  return this.ticketService.closeTicket(
    ticketId,
    req.user,
  );
}


}
