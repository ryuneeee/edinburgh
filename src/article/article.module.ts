import { CacheModule, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { RedisRepositoryModule } from 'src/redis/redis.repository.module';
import { ArticleRedisService } from 'src/redis/article.redis.service';

@Module({
  imports: [RedisRepositoryModule],
  providers: [ArticleService, ArticleRedisService],
  exports: [ArticleService],
})
export class ArticleModule {}
