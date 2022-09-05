import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';
import { AccessTokenService } from '../access-token/access-token.service';
import { Auth0ModuleOptions } from '../auth0-options.interface';
import { MODULE_OPTIONS_TOKEN } from '../auth0.module-definition';
import { Permission } from './permission';
import { PermissionInput } from './permission-input';

@Injectable()
export class PermissionService {
    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private options: Auth0ModuleOptions,
        private readonly accessTokenService: AccessTokenService,
        private readonly httpService: HttpService,
    ) { }

    async patchPermissions(appId: string, permissions?: PermissionInput[]) {
        const { access_token, token_type } = await this.accessTokenService.getAccessToken()
        const url = `${this.options.identifier}resource-servers/${appId}`
        return lastValueFrom(this.httpService.patch<{ scopes: Permission[] }>(url, {
            scopes: permissions,
        }, {
            headers: {
                authorization: `${ token_type } ${ access_token }`
            },
        }).pipe(
            map(resp => resp.data),
            map(data => data.scopes),
        )).catch(err => {
            throw err.message;
        })
    }
}
