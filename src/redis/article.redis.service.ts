import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Article } from 'src/model/Article';

@Injectable()
export class ArticleRedisService {
  private readonly MAX_LENGTH = 50;
  private readonly ARTICLE_KEY = 'articles';
  private readonly LATEST_TOPIC = 'edinburgh.latest';

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(serviceName: string): Promise<Array<Article>> {
    return this.redis.hget(this.ARTICLE_KEY, serviceName).then((x) => JSON.parse(x) || []);
  }

  async set(serviceName: string, articles: Array<Article>) {
    return this.redis.hset(this.ARTICLE_KEY, serviceName, JSON.stringify(articles));
  }

  async put(serviceName: string, newArticles: Array<Article>) {
    const cachedArticles: Array<Article> = await this.get(serviceName);

    newArticles.forEach((x) => {
      cachedArticles.splice(0, 0, x);
      if (cachedArticles.length > this.MAX_LENGTH) cachedArticles.pop();
    });

    await this.set(serviceName, cachedArticles);
  }

  async publish(serviceName: string, articles: Array<Article>) {
    const payload = {
      serviceName: serviceName,
      articles: articles,
    };
    return await this.redis.publish(this.LATEST_TOPIC, JSON.stringify(payload));
  }

  async getSites() {
    return this.redis.hkeys(this.ARTICLE_KEY);
  }
}
