import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core'
import { provideHttpClient } from '@angular/common/http'
import { provideRouter } from '@angular/router'
import { provideEffects } from '@ngrx/effects'
import { provideStore } from "@ngrx/store"
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { appRoutes } from './app.routes'
import { UtilsModule, getEnvAPI } from "@pokemon-fe/utils"
import { environment } from '@env/pokemon-fe'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideStore({}),
    provideStoreDevtools({
      maxAge: 10,
      connectInZone: true
    }),
    provideEffects([]),
    importProvidersFrom([
      UtilsModule.forRoot(getEnvAPI(environment), environment),
    ])
  ],
};
