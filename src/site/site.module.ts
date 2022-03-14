import { Module } from '@nestjs/common';
import { ClienService } from './clien.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ClienParkService } from './clien.park.service';
import { ScrapModule } from 'src/scrap/scrap.module';
import { PpomppuService } from './ppomppu.service';
import { PpomppuChinaService } from './ppomppu.china.service';
import { PpomppuOverseasService } from './ppomppu.overseas.service';

@Module({
  imports: [ScrapModule, ScheduleModule.forRoot()],
  controllers: [],
  providers: [
    ClienService,
    PpomppuService,
    PpomppuChinaService,
    PpomppuOverseasService,
  ],
  // providers: [ClienService, ClienParkService, PpomppuService],
})
export class SiteModule {}
