import { HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokenService } from '../access-token/access-token.service';
import { MODULE_OPTIONS_TOKEN } from '../auth0.module-definition';
import { PermissionService } from './permission.service';

describe('PermissionService', () => {
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        PermissionService,
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

    service = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  xit('should create a permission', () => {
    return service.patchPermissions('6315be99083f44ceffc4f4de', [
      {
        value: 'PERMISSION_NAME',
        description: 'PERMISSION_DESC',
      }
    ]).then(resp => {
      expect(resp).toBeDefined();
    })
  });
});
