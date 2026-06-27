import { Body, Controller, Post, UseGuards, Get, Request, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { UpdateUserRoleDto } from './updateUser.dto';

@Controller('auth')
export class AuthController {

    //constructor com as classes de dependencia
    constructor ( private authService : AuthService, )
    {}



//rota para registro
@Post('register')
register(@Body() registeDto : RegisterDto){
 return this.authService.register(registeDto)
  
}

//rota para login
@Post('login')
login(@Body() loginDto : LoginDto){
    return this.authService.login(loginDto)
}

//rota para login
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
