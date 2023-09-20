import '@angular/compiler';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { JetstreamWsService } from '@his-base/jetstream-ws';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: JetstreamWsService,
      useValue: new JetstreamWsService({
        // stream name
        name: 'OPD',
      }),
    },
  ],
};
