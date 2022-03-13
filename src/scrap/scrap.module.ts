import { Module } from '@nestjs/common';
import { SiteModule } from 'src/site/site.module';
import { ScrapService } from './scrap.service';

@Module({
  providers: [ScrapService],
  exports: [ScrapService]
})
export class ScrapModule {}
