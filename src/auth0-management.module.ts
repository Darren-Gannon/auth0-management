import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'
import { ConfigurableModuleClass } from './auth0.module-definition';
import { UserService } from './user/user.service';
import { PermissionService } from './permission/permission.service';

@Module({
  imports: [HttpModule],
  providers: [UserService, PermissionService],
  exports: [UserService],
})
export class Auth0ManagementModule extends ConfigurableModuleClass { }