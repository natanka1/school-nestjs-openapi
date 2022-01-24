import { Get, Controller } from '@nestjs/common';
import { get } from 'http';

@Controller('app')
export class AppController {
    @Get('config')
    printConfig(){
        console.log('hello from config')
    }
}
