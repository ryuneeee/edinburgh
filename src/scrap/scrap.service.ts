import { Injectable } from '@nestjs/common';
import { Scrap } from 'src/model/Scrap';

@Injectable()
export class ScrapService {
  scrapMap = new Map<string, Scrap>();

  scrap(serviceName: string, scraps: Array<Scrap>) {
    const newScraps = this.subtract(scraps, this.scrapMap[serviceName]);
    if (newScraps.length > 0) this.scrapMap[serviceName] = scraps;

    scraps.map((x: Scrap) => {
      this.scrapMap[serviceName]
        .filter((y: Scrap) => y.href == x.href)
        .map((z: Scrap) => {
          z.hits = x.hits;
          z.comments = x.comments;
        });
    });
  }

  subtract(arr1: Array<Scrap>, arr2: Array<Scrap> = []): Array<Scrap> {
    return arr1.filter((x) => arr2.map((y) => y.href).indexOf(x.href) < 0);
  }
}
