import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { HttpModule } from '@nestjs/axios'
import { MODULE_OPTIONS_TOKEN } from '../auth0.module-definition';
import { AccessTokenService } from '../access-token/access-token.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        UserService, 
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
        },
        AccessTokenService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  it('should get a list of users', () => {
    return service.getAll().then(users => {
      expect(users).toBeDefined();
    })
  });
});
