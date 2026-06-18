import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import {LoginDto} from "../auth/login.dto";
import {RegisterDto} from "../auth/register.dto";
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { error } from 'node:console';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {

 // Declarando dependencias com constructor
   constructor(
    private prisma: PrismaService,
    private jwtService : JwtService,
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



//Definindo metodo login
async  login (loginDto : LoginDto) {

  //checando se email existe 
  const UserExists = await this.prisma.user.findUnique({
    where : {
      email : loginDto.email,
    }
  })

  if (!UserExists) {
    throw new UnauthorizedException('Email ou senha incorretos')
  }

  const passwordMatch = await bcrypt.compare(loginDto.password, UserExists.password)


  if (!passwordMatch) {
    throw new UnauthorizedException('Email ou senhas incorretos')
  }

  //Gerarando o token jwt
  //criando payload
  const payload = {
  sub : UserExists.id,
  email : UserExists.email,
  role : UserExists.role,
  };

  //criando token 
  const token = await this.jwtService.signAsync(payload)

  //retornando token jwt
  return {
    acessToken : token,
  }


}


}