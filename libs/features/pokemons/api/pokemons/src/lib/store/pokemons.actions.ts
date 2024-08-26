import { createActionGroup, props } from "@ngrx/store"
import { Pokemon } from "../classes"
import { Page, PageQuery } from "@pokemon-fe/utils"
import { HttpErrorResponse } from "@angular/common/http"

export const PokemonsApiActions = createActionGroup({
  source: 'Pokemons API',
  events: {
    'Load Pokemons Success': props<{
      page: Page
      pokemons: Pokemon[]
    }>(),
    'Load Pokemons Failure': props<{
      error: HttpErrorResponse | null
    }>()
  }
})

export const PokemonsPageActions = createActionGroup({
  source: 'Pokemons Page',
  events: {
    'Load Pokemons': props<{ query: PageQuery}>(),
    'Set Current Page': props<{ query: PageQuery }>(),
  }
})