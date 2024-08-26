import { Pokemon } from "../classes"
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity"
import { createFeature, createReducer, on } from "@ngrx/store"
import { PokemonsApiActions, PokemonsPageActions } from "./pokemons.actions"
import { HttpErrorResponse } from "@angular/common/http"

export const POKEMONS_FEATURE_KEY = "pokemons"

export interface PokemonsState extends EntityState<Pokemon> {
  loaded: boolean
  error: HttpErrorResponse | null
}

export const pokemonsAdapter: EntityAdapter<Pokemon> =
  createEntityAdapter<Pokemon>()

export const initialPokemonsState: PokemonsState = pokemonsAdapter.getInitialState(
  {
    loaded: false,
    error: null
  }
)

const reducer = createReducer(
  initialPokemonsState,
  on(
    PokemonsPageActions.loadPokemons,
    (state): PokemonsState => ({
      ...state,
      loaded: false,
      error: null
    })
  ),
  on(
    PokemonsApiActions.loadPokemonsSuccess,
    (state, { pokemons }): PokemonsState =>
      pokemonsAdapter.upsertMany(pokemons, {
        ...state,
        loaded: true
      })
  ),
  on(PokemonsApiActions.loadPokemonsFailure,
    (state, { error }): PokemonsState => ({
      ...state,
      error,
      loaded: true
    })
  )
)

export const pokemonsFeature = createFeature({
  name: POKEMONS_FEATURE_KEY,
  reducer,
})