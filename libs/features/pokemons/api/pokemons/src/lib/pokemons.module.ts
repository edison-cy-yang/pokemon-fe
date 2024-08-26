import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { provideEffects } from "@ngrx/effects"
import { provideState } from "@ngrx/store"
import { PokemonsEffects } from "./store/pokemons.effects"
import * as fromPokemons from "./store/pokemons.reducer"
import * as fromPokemonsPagination from "./store/pokemons-pagination.reducer"
import { PokemonsService } from "./services"

@NgModule({
  imports: [CommonModule],
  providers: [
    PokemonsService,
    provideState(fromPokemons.pokemonsFeature),
    provideState(fromPokemonsPagination.pokemonsPaginationFeature),
    provideEffects([PokemonsEffects]),
  ]
})
export class PokemonsModule {}