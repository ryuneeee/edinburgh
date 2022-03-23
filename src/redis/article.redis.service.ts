import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Article } from 'src/model/Article';

@Injectable()
export class ArticleRedisService {

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(serviceName: string): Promise<Array<Article>> {
    return this.redis.hget('articles', serviceName).then(x => JSON.parse(x) || []);
  }

  async set(serviceName: string, articles: Array<Article>) {
    return this.redis.hset('articles', serviceName, JSON.stringify(articles));
  }

  async getSites() {
    return this.redis.hkeys('articles')
  }
}
