import { ConfigurableModuleBuilder } from '@nestjs/common';
import { Auth0ModuleOptions } from './auth0-options.interface';

export const {
    ConfigurableModuleClass,
    MODULE_OPTIONS_TOKEN,
    ASYNC_OPTIONS_TYPE,
    OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<Auth0ModuleOptions>()
    .build();