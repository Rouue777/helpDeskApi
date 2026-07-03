import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from './comment.dto';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';


@Controller('comments')
export class CommentController {

    //instanciando dependencias
    constructor(
        private commentService : CommentService
    ){}

//rota para criar comentario
@UseGuards(JwtAuthGuard)
@Post(':ticketId/comment')
create(@Param('ticketId') ticketId : string,
@Body() createCommentDto : CreateCommentDto,
@Request() req,
){
    return this.commentService.create(
        createCommentDto,
        ticketId,
        req.user.sub,

    )

}

// rota para pegar comentarios do ticket

@UseGuards(JwtAuthGuard)
@Get(':ticketId')
getCommentsByTicket(
  @Param('ticketId') ticketId: string,
) {
  return this.commentService.getCommentsByTicket(
    ticketId,
  );
}



}
