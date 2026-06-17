import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './register.dto';

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



}
