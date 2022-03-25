import { Injectable } from '@nestjs/common';
import { Article } from 'src/model/Article';
import { Result } from 'src/model/Result';
import { ArticleRedisService } from '../redis/article.redis.service';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRedis: ArticleRedisService) {}

  async scrap(result: Result) {
    await this.articleRedis.updateLatestProps(result);

    const newArticles = await this.subtract(result);

    if (newArticles.length > 0) {
      await this.articleRedis.put(result.site, newArticles);
      await this.articleRedis.publish(result.site, newArticles);
    }
  }

  async subtract(result: Result): Promise<Array<Article>> {
    const cachedArticles: Array<Article> = await this.articleRedis.get(result.site.name);
    return result.articles.filter((e1) => !cachedArticles.map((e2) => e2.href).includes(e1.href));
  }

  async getAllAtricles(): Promise<any> {
    return (async () => {
      const articles = {};

      await Promise.all(
        (
          await this.articleRedis.getSites()
        ).map(async (key: string) => {
          articles[key] = await this.articleRedis.get(key);
        })
      );

      return articles;
    })();
  }
}
