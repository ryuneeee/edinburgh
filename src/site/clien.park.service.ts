import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import cheerio from 'cheerio';
import { Scrap } from 'src/model/Scrap';
import { ScrapService } from 'src/scrap/scrap.service';

const baseUrl = 'https://clien.net';
const target = `${baseUrl}/service/board/park`;

@Injectable()
export class ClienParkService {
  constructor(private readonly scrapService: ScrapService) {}

  private readonly logger = new Logger(ClienParkService.name);

  @Cron('0 */1 * * * *')
  scrahandleCronp() {
    axios
      .get(target)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const scraps = $('div[data-role="list-row"]')
          .map((i, row) => {
            const title = $(row).find('span[data-role="list-title-text"]').text().replace(/\n/g, '').replace(/\t/g, '');
            const href = baseUrl + $(row).find('a[data-role="cut-string"]').attr('href');
            const hits = $(row).find('.list_hit').first().text().replace('.', '').replace(' k', '00');
            const comments = $(row).find('.rSymph05').first().text();

            return new Scrap(title, href, Number(hits), Number(comments));
          })
          .get();

        this.scrapService.scrap(ClienParkService.name, scraps);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
  }
}
