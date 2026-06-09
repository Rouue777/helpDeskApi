import { Injectable } from '@nestjs/common';

@Injectable()
export class TestesService {

    teste() {
        return "32"
    };


    create() {
        console.log('criado')
    }


}
