import { Injectable } from '@nestjs/common';
import { Article } from 'src/model/Article';
import { ArticleRedisService } from 'src/redis/article.redis.service';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRedis: ArticleRedisService) {}
  
  async scrap(serviceName: string, articles: Array<Article>) {
    const cachedArticles: Array<Article> = await this.articleRedis.get(serviceName);
    let newArticles: Array<Article> = this.subtract(articles, cachedArticles);
 
    if (newArticles.length > 0) {
      await this.articleRedis.set(serviceName, articles)
    }

    await this.updateLatest(serviceName, articles)
  }

  async updateLatest(serviceName: string, articles: Array<Article>) {
    Promise.all(articles.map(async (newArticle: Article) => {
      return (await this.articleRedis.get(serviceName))
        .filter((a: Article) => a.href == newArticle.href)
        .map((oldArticle: Article) => {
          oldArticle.title = newArticle.title;
          oldArticle.hits = newArticle.hits;
          oldArticle.comments = newArticle.comments;
          return oldArticle
        });
    })).then(async latest => await this.articleRedis.set(serviceName, latest.flat()));
    
  } 

  private subtract(arr1: Array<Article>, arr2: Array<Article> = new Array<Article>()): Array<Article> {
    return arr1.filter((e1) => !arr2.map((e2) => e2.href).includes(e1.href))
  }

  async getAllAtricles(): Promise<any> {
    return (async () => {
      let articles = {}
      
      await Promise.all((await this.articleRedis.getSites()).map(async (key: string) => {
        articles[key] = await this.articleRedis.get(key)
      }))
      
      return articles
    })();
  }
}
