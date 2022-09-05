import { Test, TestingModule } from '@nestjs/testing';
import { MODULE_OPTIONS_TOKEN } from '../auth0.module-definition';
import { AccessTokenService } from './access-token.service';
import { HttpModule } from '@nestjs/axios';

describe('AccessTokenService', () => {
  let service: AccessTokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AccessTokenService,
        {
          provide: MODULE_OPTIONS_TOKEN,
          useValue: {
            identifier: 'https://auth0-nestjs.us.auth0.com/api/v2/',
            access_token_endpoint: 'https://auth0-nestjs.us.auth0.com/oauth/token',
            client: {
              id:"Z2DHUpEv0b4EUNu84CsqqktzrLoQKreZ",
              secret:"PNJRqHstEMtblKHhUynv5sBjqqnOiyh6f7oEsz7eQ972p5a7ogCcFpmzI4CbgW6n",
            }
          }
        }
      ],
    }).compile();

    service = module.get<AccessTokenService>(AccessTokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a token', () => {
    return service.getAccessToken().then(token => {
      expect(token).toBeDefined();
    })
  });
});
