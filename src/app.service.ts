import { Injectable } from '@nestjs/common';
import { ArticleService } from './article/article.service';

@Injectable()
export class AppService {
  constructor(private articleService: ArticleService) {}

  async getHello(): Promise<string> {
    return this.articleService.getAllAtricles().then(x => {
      return JSON.stringify(x);
    })
  }
}
