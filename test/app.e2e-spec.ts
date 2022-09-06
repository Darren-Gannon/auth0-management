import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import { Request } from 'express';
import { AppModule } from './app/app.module';
import { Auth0Module, AuthzGuard } from '../src';
import { APP_GUARD } from '@nestjs/core';
import { PermissionsGuard } from '../src/permissions/permissions.guard';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        Auth0Module.register({
          issuer: 'https://darren-anchorpoint.us.auth0.com/',
          audience: 'http://localhost:3001',
          extractUserPermissions: (context: ExecutionContext) => {
            const req: Request = context.switchToHttp().getRequest()
            return req.user.permissions;
          },
        }),
      ],
      providers: [
        {
          provide: APP_GUARD,
          useClass: AuthzGuard,
        },
      ]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })

  it('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should define permission gaurd', () => {
    const gaurd = app.get(PermissionsGuard)

    expect(gaurd).toBeDefined();
  })
});
