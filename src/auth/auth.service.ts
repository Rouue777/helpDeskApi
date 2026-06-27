import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import {LoginDto} from "../auth/login.dto";
import {RegisterDto} from "../auth/register.dto";
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { error } from 'node:console';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserRoleDto } from './updateUser.dto';



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
  name : UserExists.name,
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


//atribuicao de role ao usuario
async updateRole(
  user: any,
  updateUserRoleDto: UpdateUserRoleDto,
) {
  // Apenas ADMIN
  if (user.role !== 'ADMIN') {
    throw new ForbiddenException(
      'Você não tem permissão para alterar roles',
    );
  }

  if (user.email === updateUserRoleDto.email) {
  throw new BadRequestException(
    'Você não pode alterar sua própria role.',
  );
}

  // Verifica se o usuário existe
  const userExists = await this.prisma.user.findUnique({
    where: {
      email: updateUserRoleDto.email,
    },
  });

  if (!userExists) {
    throw new NotFoundException('Usuário não encontrado');
  }

  // Atualiza a role
  const updatedUser = await this.prisma.user.update({
    where: {
      email: updateUserRoleDto.email,
    },
    data: {
      role: updateUserRoleDto.role,
    },
  });

  return {
    message: 'Role atualizada com sucesso',
    user: updatedUser,
  };
}


}