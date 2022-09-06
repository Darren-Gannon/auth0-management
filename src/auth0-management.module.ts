import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { ConfigurableModuleClass } from './auth0.module-definition';
import { UserService } from './user/user.service';
import { PermissionService } from './permission/permission.service';
import { Reflector } from '@nestjs/core';
import { AccessTokenService } from './access-token/access-token.service';

@Module({
  imports: [
    HttpModule
  ],
  providers: [
    Reflector,
    UserService, 
    PermissionService,
    AccessTokenService,
  ],
  exports: [UserService],
})
export class Auth0ManagementModule extends ConfigurableModuleClass { }