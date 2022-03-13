import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScrapModule } from './scrap/scrap.module';

@Module({
  // imports: [ScrapModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
