import { Injectable } from '@nestjs/common';
import e from 'express';
import { Article } from 'src/model/Article';
import { ArticleRedisService } from '../redis/article.redis.service';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRedis: ArticleRedisService) {}

  async scrap(serviceName: string, articles: Array<Article>) {
    await this.updateLatestProps(serviceName, articles);

    const cachedArticles = await this.articleRedis.get(serviceName);
    const newArticles = this.subtract(articles, cachedArticles);

    if (newArticles.length > 0) {
      await this.articleRedis.put(serviceName, newArticles);
      await this.articleRedis.publish(serviceName, newArticles);
    }
  }

  private subtract(articles: Array<Article>, cachedArticles: Array<Article> = new Array<Article>()): Array<Article> {
    return articles.filter((e1) => !cachedArticles.map((e2) => e2.href).includes(e1.href));
  }

  async updateLatestProps(serviceName: string, articles: Array<Article>) {
    Promise.all(
      articles.map(async (newArticle: Article) => {
        return (await this.articleRedis.get(serviceName))
          .filter((a: Article) => a.href == newArticle.href)
          .map((oldArticle: Article) => {
            Object.assign(oldArticle, newArticle);
            return oldArticle;
          });
      })
    ).then(async (latest) => await this.articleRedis.set(serviceName, latest.flat()));
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
