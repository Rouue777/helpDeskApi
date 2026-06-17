import { ConflictException, Injectable } from '@nestjs/common';
import {LoginDto} from "../auth/login.dto";
import {RegisterDto} from "../auth/register.dto";
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { error } from 'node:console';



@Injectable()
export class AuthService {

 // Declarando dependencias com constructor
   constructor(
    private prisma: PrismaService,
  ) {}


 //definindo metodo de classe resgiter
async  register (registerDto : RegisterDto) {

        //validando se email já existe
        const userExists = await this.prisma.user.findUnique({
          where : {
            email : registerDto.email,
          },
        })
        //se retornar vazio continua normalmente o cadastro
        if (userExists) { 
           throw new ConflictException("Usuario ja cadastrado")        
        }

        //criptografar senha com bcrypt
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);

        //salvar usuario no banco
        const userRegister = await this.prisma.user.create({
          data: {
            name : registerDto.name,
            email : registerDto.email,
            password : hashedPassword,
          }
        })

        //retorna registro
        return {
          message: 'Usuário criado com sucesso',
          register : userRegister,
        };

   }




async  login (loginDto : LoginDto) {}


}


