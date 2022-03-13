import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiStatus } from './models/ApiStatus';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiVersion(): ApiStatus {
    return this.appService.getAPIVersion();
  }
}
