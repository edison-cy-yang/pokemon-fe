import { NgModule } from "@angular/core"
import { PokemonsService } from "./services"

@NgModule({
  providers: [
    PokemonsService,
  ]
})
export class PokemonsModule {}