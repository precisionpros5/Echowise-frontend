import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

export const appConfig = [
  provideRouter(routes),
  importProvidersFrom(FormsModule)
];
