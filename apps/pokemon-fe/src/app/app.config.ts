import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import { appRoutes } from './app.routes'
import { UtilsModule, getEnvAPI } from "@pokemon-fe/utils"
import { environment } from '@env/pokemon-fe'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    importProvidersFrom([
      UtilsModule.forRoot(getEnvAPI(environment), environment)
    ])
  ],
};
