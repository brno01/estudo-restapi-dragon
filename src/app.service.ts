import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello Fucking World!';
    }
}
console.log('REST API em Nest JS para diferentes tipos de Banco de Dados');
