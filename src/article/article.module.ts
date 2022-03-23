import { CacheModule, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { RedisRepositoryModule } from '../redis/redis.repository.module';
import { ArticleRedisService } from '../redis/article.redis.service';

@Module({
  imports: [RedisRepositoryModule],
  providers: [ArticleService, ArticleRedisService],
  exports: [ArticleService],
})
export class ArticleModule {}
