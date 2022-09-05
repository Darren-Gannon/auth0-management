import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  })

  afterAll(async () => {
    await app.close()
  })

  it('1 + 1 = 2', () => {
    expect(1 + 1).toBe(2)
  })
});
