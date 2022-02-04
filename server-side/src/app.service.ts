import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'no world';
  }
  getDog(): string {
    return 'dog';
  }
}
