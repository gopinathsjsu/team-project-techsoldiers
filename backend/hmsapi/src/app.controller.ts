import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiStatus } from './models/ApiStatus';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiVersion(): ApiStatus {
    return this.appService.getAPIVersion();
  }
 // Use of auth guard in a route to protect 
  @Get()
  @UseGuards(AuthGuard('jwt'))
  getHello(): string{
    return "Hello World";
  }
}

