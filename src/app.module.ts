import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { SiteModule } from './site/site.module';

@Module({
  imports: [ArticleModule, SiteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
