import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get name(): string {
    return this.configService.get<string>('APP_NAME');
  }

  get url(): string {
    return this.configService.get<string>('APP_URL');
  }

  get port(): number {
    return +this.configService.get<string>('APP_PORT');
  }
}
