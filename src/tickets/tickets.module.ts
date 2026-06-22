import { Module } from '@nestjs/common';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogModule } from 'src/log/log.module';

@Module({
  imports: [PrismaModule, LogModule],
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
