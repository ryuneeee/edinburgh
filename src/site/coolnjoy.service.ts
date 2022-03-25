import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import cheerio from 'cheerio';
import { ArticleService } from 'src/article/article.service';
import { Site } from 'src/model/Site';

const baseUrl = '';
const target = 'https://coolenjoy.net/bbs/jirum';

@Injectable()
export class CoolnJoyService {
  constructor(private readonly articleService: ArticleService) {}

  private readonly logger = new Logger(CoolnJoyService.name);
  private readonly site: Site = { name: 'coolnjoy', desc: '쿨엔조이', icon: '💻' };

  @Cron('0 */1 * * * *')
  scrahandleCronp() {
    axios
      .get(target)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const articles = $('tbody>tr')
          .map((i, row) => {
            const title = $(row)
              .find('.td_subject')
              .text()
              .replace(/\n/g, '')
              .replace(/댓글.*/g, '')
              .trim();
            const href = baseUrl + $(row).find('.td_subject > a').attr('href');
            const hits = $(row).find('.td_hit').first().text().replace('.', '').replace('k', '00');
            const comments = $(row).find('.cnt_cmt').first().text().replace('[', '').replace(']', '');

            return { title: title, href: href, hits: Number(hits), comments: Number(comments) };
          })
          .get();

        console.log(articles);

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
