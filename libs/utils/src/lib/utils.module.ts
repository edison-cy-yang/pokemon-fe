import { NgModule, ModuleWithProviders } from "@angular/core"
import { Environment } from "@env/interface"

@NgModule()
export class UtilsModule {
  static forRoot(
    api: string,
    environment: Environment,
  ): ModuleWithProviders<UtilsModule> {
    return {
      ngModule: UtilsModule,
      providers: [
        {
          provide: 'API',
          useValue: api,
        },
        {
          provide: 'ENV',
          useValue: environment,
        }
      ]
    }
  }
}