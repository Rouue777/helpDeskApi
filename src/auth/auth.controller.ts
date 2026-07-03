import { Body, Controller, Post, UseGuards, Get, Request, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { UpdateUserRoleDto } from './updateUser.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    //constructor com as classes de dependencia
    constructor ( private authService : AuthService, )
    {}



//rota para registro
@ApiOperation({
  summary: 'Cadastrar usuário',
})
@Post('register')
register(@Body() registeDto : RegisterDto){
 return this.authService.register(registeDto)
  
}

//rota para login
@ApiOperation({
  summary: 'Realiza login do usuário',
})
@Post('login')
login(@Body() loginDto : LoginDto){
    return this.authService.login(loginDto)
}

//rota para role
@ApiOperation({
  summary: 'Atualizar role do usuário',
})
@UseGuards(JwtAuthGuard)
@Patch('role')
updateRole(
  @Request() req,
  @Body() updateUserRoleDto: UpdateUserRoleDto,
) {
  return this.authService.updateRole(
    req.user,
    updateUserRoleDto,
  );
}




}
