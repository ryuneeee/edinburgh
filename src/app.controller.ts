import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Header('content-type', 'application/json')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }
}
