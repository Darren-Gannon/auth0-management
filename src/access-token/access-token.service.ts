import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Auth0ModuleOptions } from '../auth0-options.interface';
import { MODULE_OPTIONS_TOKEN } from '../auth0.module-definition';
import { AccessToken } from './access-token';

const EXPIRY_OFFSET = 10000;

@Injectable()
export class AccessTokenService {
    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private options: Auth0ModuleOptions,
        private readonly httpService: HttpService,
    ) { }

    private token?: AccessToken

    async getAccessToken(): Promise<AccessToken> {
        if(this.token)
            return this.token
        return lastValueFrom(
            this.httpService.post<AccessToken>(this.options.access_token_endpoint, {
                client_id: this.options.client.id,
                client_secret: this.options.client.secret,
                audience: this.options.identifier,
                grant_type: "client_credentials"
            }).pipe(
                map(resp => resp.data),
                tap(token => {
                    this.token = token;
                    setTimeout(() => {
                        this.token = null;
                    }, (token.expires_in * 1000) - EXPIRY_OFFSET)
                }),
            )
        )
    }
}
