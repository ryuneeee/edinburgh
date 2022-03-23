import { Controller, Get, Header } from '@nestjs/common';
import { json } from 'stream/consumers';
import { AppService } from './app.service';
import { ArticleService } from './article/article.service';
import { Article } from './model/Article';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    private readonly articleService: ArticleService) {}

  @Get()
  @Header('content-type', 'application/json')
  async getHello(): Promise<string> {
    return JSON.stringify(await this.articleService.getAllAtricles())
  };

  @Get("/hello")
  @Header('content-type', 'application/json')
  async getHello2(): Promise<string> {
    let json2 =  '{"title":"hello","href":"/","hits":0,"comments":0}'

    let json = JSON.parse(json2) as Article

    return json2
    // return this.articleService.getAtricles().then(x => JSON.stringify(Object.fromEntries(x)));
  };
}