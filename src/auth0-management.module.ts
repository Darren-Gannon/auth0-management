import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './auth0.module-definition';

@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class Auth0ManagementModule extends ConfigurableModuleClass { }