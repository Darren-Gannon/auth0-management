import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Auth0ManagementModule } from '../../src';

@Module({
  imports: [
    Auth0ManagementModule.register({
      identifier: 'https://auth0-nestjs.us.auth0.com/api/v2/',
      access_token_endpoint: 'https://auth0-nestjs.us.auth0.com/oauth/token',
      client: {
        id:"Z2DHUpEv0b4EUNu84CsqqktzrLoQKreZ",
        secret:"PNJRqHstEMtblKHhUynv5sBjqqnOiyh6f7oEsz7eQ972p5a7ogCcFpmzI4CbgW6n",
      }
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
