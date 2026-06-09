import { Controller, Post, Get } from '@nestjs/common';
import { TestesService } from './testes.service';

@Controller('testes')
export class TestesController {

  constructor (private readonly testeservice : TestesService ) {}


  @Get("get")
  findAll() : string {
    return this.testeservice.teste()
  }


  @Post("post")
  testaPost() : 
  


}
