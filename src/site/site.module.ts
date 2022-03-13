import { Module } from '@nestjs/common';
import { ClienService } from './clien.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ClienParkService } from './clien.park.service';
import { ScrapModule } from 'src/scrap/scrap.module';
import { PpomppuService } from './ppomppu.service';

@Module({
  imports: [
    ScrapModule,
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [ClienService, ClienParkService, PpomppuService],
})
export class SiteModule {}
