import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ArticleRedisService } from './article.redis.service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: () => ({
        config: {
          url: `redis://${process.env.REDIS_HOST || 'localhost'}:6379`,
        },
      }),
    }),
  ],
  providers: [ArticleRedisService],
  exports: [ArticleRedisService],
})
export class RedisRepositoryModule {}
