import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TicketsModule } from './tickets/tickets.module';
import { CommentModule } from './comment/comment.module';
import { CommentController } from './comment/comment.controller';
import { CommentService } from './comment/comment.service';

@Module({
  imports: [AuthModule, PrismaModule, TicketsModule, CommentModule],
  controllers: [AppController, CommentController],
  providers: [AppService, CommentService],
})
export class AppModule {}
