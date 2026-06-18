import { Body, Controller, Post, UseGuards, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';

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

@Post('login')
login(@Body() loginDto : LoginDto){
    return this.authService.login(loginDto)
}





}
