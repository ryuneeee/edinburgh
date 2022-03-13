import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ClienService {

  private readonly logger = new Logger(ClienService.name);

  @Cron('*/1 * * * * *')
  scrahandleCronp() {
    this.logger.debug('Called when the current second is 45');
  }

}
