import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app/app.module';
import axios from 'axios';
import request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {

    const access_token = await axios.post('https://auth0-nestjs.us.auth0.com/oauth/token', {
      "client_id": "rhSs1I3A5OMnGdTJ6yDVIyP0kggBgRRy",
      "client_secret": "TylHZwU4NFmuBhgOXA5-FThHEopZvb73Gfj9wDe6-hajq2Yai9ozA26LQhM42bWe",
      "audience": "https://auth0-nestjs.us.auth0.com/api/v2/",
      "grant_type": "client_credentials"
    }).then(resp => resp.data)
      .then(data => data.access_token)

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
