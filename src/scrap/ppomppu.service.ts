import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class PpomppuService {

  private readonly logger = new Logger(PpomppuService.name);

  @Cron('*/1 * * * * *')
  scrahandleCronp() {
    this.logger.debug('Called when the current second is 45');
  }

}
