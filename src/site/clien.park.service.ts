import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import cheerio from 'cheerio';
import { ArticleService } from 'src/article/article.service';
import { Site } from 'src/model/Site';

const baseUrl = 'https://clien.net';
const target = `${baseUrl}/service/board/park`;

@Injectable()
export class ClienParkService {
  constructor(private readonly articleService: ArticleService) {}

  private readonly logger = new Logger(ClienParkService.name);
  private readonly site: Site = { name: 'clien.park', desc: '클리앙 모공', icon: '💬' };

  @Cron('*/1 * * * * *')
  scrahandleCronp() {
    axios
      .get(target)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const articles = $('div[data-role="list-row"]')
          .map((i, row) => {
            const title = $(row).find('span[data-role="list-title-text"]').text().replace(/\n/g, '').replace(/\t/g, '');
            const href = baseUrl + $(row).find('a[data-role="cut-string"]').attr('href');
            const hits = $(row).find('.list_hit').first().text().replace('.', '').replace(' k', '00');
            const comments = $(row).find('.rSymph05').first().text();

            return { title: title, href: href, hits: Number(hits), comments: Number(comments) };
          })
          .get();

        this.articleService.scrap({ site: this.site, articles: articles });
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
