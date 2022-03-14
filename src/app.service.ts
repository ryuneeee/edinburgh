import { Injectable } from '@nestjs/common';
import { ScrapService } from './scrap/scrap.service';

@Injectable()
export class AppService {
  constructor(private scrapService: ScrapService) {}

  getHello(): string {
    return JSON.stringify(this.scrapService.scrapMap);
  }
}
