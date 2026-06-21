import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { error } from 'console';
import prismaConfig from 'prisma.config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentDto } from './comment.dto';


@Injectable()
export class CommentService {

    constructor(
        private prisma : PrismaService
    ){}

    //criacao dos metodos comment

//create comment

async create(
  createCommentDto: CreateCommentDto,
  ticketId: string,
  userId: string,
){
    //verifica se o ticket existe
    const ticketExists = await this.prisma.ticket.findUnique({
        where : {
            id : ticketId,},
    });

    if(!ticketExists) {
        throw new NotFoundException('ticket não encontrado')
    }

    //envia comentario
    const commentCreated = await this.prisma.comment.create({
            data : {
                content : createCommentDto.content,
                ticketId,
                userId
            },
        
    });

    if(!commentCreated){
      throw new InternalServerErrorException('Erro ao criar comentario')
    }

    console.log('comentario criado com sucesso')

    return {
        message : 'comentario criado com sucesso',
        comment : commentCreated,
    }

}


};



