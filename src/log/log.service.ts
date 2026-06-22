import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LogService {
    //instanciando dependencias
    constructor(
        private prisma : PrismaService
    ){}

    //criando metodos
async create(
  action: string,
  userId: string,
  ticketId: string,
){
 return this.prisma.log.create({
    data: {
      action,
      userId,
      ticketId,
    },
  });
}

}
