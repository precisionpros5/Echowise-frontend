import { mergeApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import { serverConfig } from './app.routes.server';

export const config = {
    providers: [...appConfig, ...serverConfig]
};
