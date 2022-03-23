import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PpomppuChinaService } from './ppomppu.china.service';
import { PpomppuOverseasService } from './ppomppu.overseas.service';
import { ClienParkService } from './clien.park.service';
import { PpomppuDomesticService } from './ppomppu.domestic.service';
import { ClienJirumService } from './clien.jirum.service';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [ArticleModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [ClienJirumService, PpomppuDomesticService, PpomppuChinaService, PpomppuOverseasService],
  // providers: [ClienParkService],
})
export class SiteModule {}
