import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { API_MAP } from './constants/application.constants';
import { apiFactory } from './api.factory';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: API_MAP,
      useFactory: apiFactory,
    },
  ],
})
export class AppModule {}
