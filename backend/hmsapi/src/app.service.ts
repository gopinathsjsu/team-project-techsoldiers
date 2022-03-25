import { Injectable } from '@nestjs/common';
import { ApiStatus } from './models/ApiStatus';

@Injectable()
export class AppService {
  getAPIVersion(): ApiStatus {
    return {
      version: '0.1',
      name: 'HMS API',
      status: 'UP',
    };
  }
}
