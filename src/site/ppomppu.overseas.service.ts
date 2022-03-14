import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Scrap } from 'src/model/Scrap';
import { ScrapService } from 'src/scrap/scrap.service';
import axios from 'axios';
import cheerio from 'cheerio';
import * as iconv from 'iconv-lite';

const baseUrl = 'https://www.ppomppu.co.kr/zboard/';
const target = `${baseUrl}zboard.php?id=ppomppu4`;

@Injectable()
export class PpomppuOverseasService {
  constructor(private readonly scrapService: ScrapService) {}

  private readonly logger = new Logger(PpomppuOverseasService.name);

  @Cron('0 */1 * * * *')
  scrahandleCronp() {
    axios
      .get(target, { responseType: 'arraybuffer' })
      .then((response) => {
        const $ = cheerio.load(iconv.decode(response.data, 'EUC-KR'));
        const scraps = $('.list0,.list1')
          .filter(
            (i, x) =>
              $(x).find('.eng.list_vspace > img').attr('alt') == undefined,
          )
          .map((i, row) => {
            const title = $(row)
              .find('td>div>a')
              .text()
              .replace(/\n/g, '')
              .replace(/\t/g, '');
            const href = baseUrl + $(row).find('td>div>a').attr('href');
            const hits = $(row).find('td').last().text();
            const comments = $(row).find('.list_comment2').text();

            return new Scrap(title, href, Number(hits), Number(comments));
          })
          .get();

        this.scrapService.scrap(PpomppuOverseasService.name, scraps);
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
