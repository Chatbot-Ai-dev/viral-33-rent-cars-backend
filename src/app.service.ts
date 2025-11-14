import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Welcome to VIRAL 33 Rent Cars API!';
  }
}