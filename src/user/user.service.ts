import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, tap } from 'rxjs/operators';
import { lastValueFrom } from 'rxjs';
import { User } from './dto/user';
import { Auth0ModuleOptions } from '../auth0-options.interface';
import { MODULE_OPTIONS_TOKEN } from '../auth0.module-definition';
import { AccessTokenService } from '../access-token/access-token.service';
import { UserConfig } from './dto/user-config';
import { UsersConfig } from './dto/users-config';
import { CreateUser } from './dto/create-user';
import { UserSelectionConfig } from './dto/user-selection-config';
import { Permission } from '../permission/permission';

@Injectable()
export class UserService {
    constructor(
        @Inject(MODULE_OPTIONS_TOKEN) private options: Auth0ModuleOptions,
        private readonly httpService: HttpService,
        private readonly accessTokenService: AccessTokenService,
    ) { }

    /**
     * required scopes ['read:users', 'read:user_idp_tokens']
     * @param id 
     * @param config 
     * @returns 
     */
    async get(id: string, config?: Partial<UserConfig>): Promise<User> {
        const { access_token, token_type } = await this.accessTokenService.getAccessToken()
        return lastValueFrom(this.httpService.get<User>(`${this.options.identifier}users/${id}`, {
            params: {
                ...config,
                fields: config?.fields?.join(','),
            },
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        }).pipe(
            map(resp => resp.data),
        ))
    }

    /**
     * required scopes ['read:users', 'read:user_idp_tokens']
     * @param config 
     * @returns 
     */
    async getAll(config?: Partial<UsersConfig>): Promise<User[]> {
        const { access_token, token_type } = await this.accessTokenService.getAccessToken()
        return lastValueFrom(this.httpService.get<User[]>(`${this.options.identifier}users`, {
            params: {
                ...config,
                fields: config?.fields?.join(','),
                sort: config?.sortBy ? `${config.sortBy[0]}: ${config.sortBy[1] == 'ASC' ? 1 : -1}` : undefined,
            },
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        }).pipe(
            map(resp => resp.data),
        ))
    }

    /**
     * required scopes ['create:users']
     */
    async create(user: Partial<CreateUser>): Promise<User> {
        const { access_token, token_type } = await this.accessTokenService.getAccessToken()
        return lastValueFrom(this.httpService.post<User>(`${this.options.identifier}users`, {
            params: {
                ...user,
            },
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        }).pipe(
            map(resp => resp.data),
        ))
    }

    /**
     * required scopes ['delete:users']
     */
    async delete(id: string): Promise<void> {
        const { access_token, token_type } = await this.accessTokenService.getAccessToken()
        return lastValueFrom(this.httpService.delete<void>(`${this.options.identifier}users/${id}`, {
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        }).pipe(
            map(resp => resp.data),
        ))
    }

    async getUserRoles(userId: string, config?: Partial<UserSelectionConfig>): Promise<string[]> {
        const { access_token, token_type } = await this.accessTokenService.getAccessToken()
        return lastValueFrom(this.httpService.get<{ roles: string[] }>(`${this.options.identifier}users/${userId}/roles`, {
            params: {
                ...config,
            },
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        }).pipe(
            map(resp => resp.data),
            map(data => data.roles),
        ))
    }

    async removeUserRoles(userId: string, roleIds: string[]): Promise<void> {
        const { access_token, token_type } = await this.accessTokenService.getAccessToken()
        return lastValueFrom(this.httpService.delete<void>(`${this.options.identifier}users/${userId}/roles`, {
            data: {
                roles: roleIds,
            },
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        }).pipe(
            map(resp => resp.data),
        ))
    }

    async assignUserRoles(userId: string, roleIds: string[]): Promise<void> {
        const { access_token, token_type } = await this.accessTokenService.getAccessToken()
        return lastValueFrom(this.httpService.post<void>(`${this.options.identifier}users/${userId}/roles`, {
            data: {
                roles: roleIds,
            },
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        }).pipe(
            map(resp => resp.data),
        ))
    }

    async getUserPermissions(userId: string, config?: Partial<UserSelectionConfig>): Promise<Partial<Permission>[]> {
        const { access_token, token_type } = await this.accessTokenService.getAccessToken()
        return lastValueFrom(this.httpService.get<Partial<Permission>[]>(`${this.options.identifier}users/${userId}/permissions`, {
            params: {
                ...config,
            },
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        }).pipe(
            map(resp => resp.data),
        ))
    }

    async removeUserPermissions(userId: string, permissionsIds: string[]): Promise<void> {
        const { access_token, token_type } = await this.accessTokenService.getAccessToken()
        return lastValueFrom(this.httpService.delete<void>(`${this.options.identifier}users/${userId}/permissions`, {
            data: {
                permissions: permissionsIds,
            },
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        }).pipe(
            map(resp => resp.data),
        ))
    }

    async assignUserPermissions(userId: string, permissionsIds: string[]): Promise<void> {
        const { access_token, token_type } = await this.accessTokenService.getAccessToken()
        return lastValueFrom(this.httpService.post<void>(`${this.options.identifier}users/${userId}/permissions`, {
            data: {
                permissions: permissionsIds,
            },
            headers: {
                Authorization: `${token_type} ${access_token}`
            }
        }).pipe(
            map(resp => resp.data),
        ))
    }
}
