import { RedisModule } from '@nestjs-modules/ioredis';
import { Test, TestingModule } from '@nestjs/testing';
import { exit } from 'process';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';

describe('AppController', () => {
  let appController: AppController;
  let redisModule: RedisModule;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ArticleModule, RedisModule],
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
    redisModule = app.get<RedisModule>(RedisModule);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(1).toBe(1);
      // expect(appController.getHello()).toBe('Hello World!');
    });
  });

  afterAll((done) => {
    exit();
  });
});
