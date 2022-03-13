import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapModule } from './scrap/scrap.module';
import { SiteModule } from './site/site.module';

@Module({
  imports: [ScrapModule, SiteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
