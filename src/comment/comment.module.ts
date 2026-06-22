import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LogService } from 'src/log/log.service';
import { LogModule } from 'src/log/log.module';

@Module({
  imports : [PrismaModule, LogModule],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
