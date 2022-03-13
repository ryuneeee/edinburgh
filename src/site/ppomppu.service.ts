import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Scrap } from 'src/model/Scrap';
import { ScrapService } from 'src/scrap/scrap.service';
import axios from 'axios';
import cheerio from 'cheerio';

const iconv = require('iconv-lite');
const target = 'https://www.ppomppu.co.kr/zboard/zboard.php?id=ppomppu4';
const baseUrl = 'https://www.ppomppu.co.kr/zboard/';

@Injectable()
export class PpomppuService {

  constructor(private readonly scrapService: ScrapService) {}

  private readonly logger = new Logger(PpomppuService.name);  

  @Cron('*/5 * * * * *')
  scrahandleCronp() {
    
    axios.get(target, {responseType: 'arraybuffer'})
    .then(response => {
      let $ = cheerio.load(iconv.decode(response.data, 'EUC-KR'));
      let scraps = $('.list0,.list1').map((i, row) => {
        
        let title = $(row).find('td>div>a').text().replace(/\n/g, '').replace(/\t/g, '');
        let href = baseUrl + $(row).find('td>div>a').attr('href');
        let hits = $(row).find('td').last().text()
        let comments = $(row).find('.list_comment2').text()

        return new Scrap(title, href, Number(hits), Number(comments))
      }).get();
      
      this.scrapService.scrap(PpomppuService.name, scraps)
    })
    .catch(error => {
      // handle error
      console.log(error);
    })
    .then(() => {
      // always executed
    });
  }

}
