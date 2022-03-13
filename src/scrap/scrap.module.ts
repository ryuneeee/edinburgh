import { Module } from '@nestjs/common';
import { ClienService } from './clien.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PpomppuService } from './ppomppu.service';


@Module({
  imports: [
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [ClienService, PpomppuService]
})
export class ScrapModule {}
