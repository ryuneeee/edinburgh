import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Article } from 'src/model/Article';
import { Result } from 'src/model/Result';
import { Site } from 'src/model/Site';

@Injectable()
export class ArticleRedisService {
  private readonly MAX_LENGTH = 50;
  private readonly ARTICLE_KEY = 'articles';
  private readonly LATEST_TOPIC = 'edinburgh.latest';

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async get(siteName: string): Promise<Array<Article>> {
    return this.redis.hget(this.ARTICLE_KEY, siteName).then((x) => JSON.parse(x)?.articles || []);
  }

  async set(site: Site, articles: Array<Article>) {
    const data = {
      desc: site.desc,
      articles: articles,
    };
    return this.redis.hset(this.ARTICLE_KEY, site.name, JSON.stringify(data));
  }

  async put(site: Site, newArticles: Array<Article>) {
    const cachedArticles: Array<Article> = await this.get(site.name);

    newArticles.forEach((x) => {
      cachedArticles.splice(0, 0, x);
      if (cachedArticles.length > this.MAX_LENGTH) cachedArticles.pop();
    });

    await this.set(site, cachedArticles);
  }

  async publish(site: Site, articles: Array<Article>) {
    const data = {
      site: site,
      articles: articles,
    };
    return await this.redis.publish(this.LATEST_TOPIC, JSON.stringify(data));
  }

  async updateLatestProps(result: Result) {
    Promise.all(
      result.articles.map(async (newArticle: Article) => {
        return (await this.get(result.site.name))
          .filter((old: Article) => old.href == newArticle.href)
          .map((old: Article) => {
            Object.assign(old, newArticle);
            return old;
          });
      })
    ).then(async (latest) => await this.set(result.site, latest.flat()));
  }

  async getSites() {
    return this.redis.hkeys(this.ARTICLE_KEY);
  }
}
