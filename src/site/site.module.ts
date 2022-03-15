import { Module } from '@nestjs/common';
import { ClienService } from './clien.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapModule } from 'src/scrap/scrap.module';
import { PpomppuService } from './ppomppu.service';
import { PpomppuChinaService } from './ppomppu.china.service';
import { PpomppuOverseasService } from './ppomppu.overseas.service';

@Module({
  imports: [ScrapModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [ClienService, PpomppuService, PpomppuChinaService, PpomppuOverseasService],
})
export class SiteModule {}
