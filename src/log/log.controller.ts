import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { LogService } from './log.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('log')
export class LogController {

    constructor(private logService : LogService,
        
    ){}



//rota para logs de cada ticket
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Get(':ticketId')
getLogsByTicket(
  @Param('ticketId') ticketId: string,
) {
  return this.logService.getLogsByTicket(
    ticketId,
  )

}


}