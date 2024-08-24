import { Route } from "@angular/router"
import { PokemonsComponent } from "./pokemons/pokemons.component"

export const pokemonsPagesPokemonsRoutes: Route[] = [
  {
    path: '',
    component: PokemonsComponent,
  }
]