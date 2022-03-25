import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import cheerio from 'cheerio';
import * as iconv from 'iconv-lite';
import { ArticleService } from 'src/article/article.service';

const baseUrl = 'https://www.ppomppu.co.kr/zboard/';
const target = `${baseUrl}zboard.php?id=ppomppu4`;

@Injectable()
export class PpomppuOverseasService {
  constructor(private readonly articleservice: ArticleService) {}

  private readonly logger = new Logger(PpomppuOverseasService.name);

  @Cron('0 */1 * * * *')
  scrahandleCronp() {
    axios
      .get(target, { responseType: 'arraybuffer' })
      .then((response) => {
        const $ = cheerio.load(iconv.decode(response.data, 'EUC-KR'));
        const articles = $('.list0,.list1')
          .filter((i, x) => $(x).find('.eng.list_vspace > img').attr('alt') == undefined)
          .map((i, row) => {
            const title = $(row).find('td>div>a').text().replace(/\n/g, '').replace(/\t/g, '');
            const href = baseUrl + $(row).find('td>div>a').attr('href');
            const hits = $(row).find('td').last().text();
            const comments = $(row).find('.list_comment2').text();

            return { site: '해외뽐뿌', title: title, href: href, hits: Number(hits), comments: Number(comments) };
          })
          .get();

        this.articleservice.scrap('ppomppu.overseas', articles);
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
