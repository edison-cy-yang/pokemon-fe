import { Page, PageQuery } from "@pokemon-fe/utils"
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity"
import { createFeature, createReducer, on } from "@ngrx/store"
import { PokemonsApiActions, PokemonsPageActions } from "./pokemons.actions"

export const POKEMONS_PAGINATION_FEATURE_KEY = "pokemons_pagination"
export const POKEMONS_PER_PAGE = 50

export interface PokemonsPaginationState extends EntityState<Page> {
  currentQuery: PageQuery
  loaded: boolean
}

export const pokemonsPaginationAdapter: EntityAdapter<Page> = createEntityAdapter<Page>()

export const initialQuery: PageQuery = {
  page: 1,
  perPage: POKEMONS_PER_PAGE,
}

export const initialPokemonsPaginationState: PokemonsPaginationState = 
pokemonsPaginationAdapter.getInitialState({
  currentQuery: initialQuery,
  loaded: false,
})

const reducer = createReducer(
  initialPokemonsPaginationState,
  on(
    PokemonsPageActions.loadPokemons,
    (state): PokemonsPaginationState => ({
      ...state,
      loaded: false,
    })
  ),
  on(
    PokemonsApiActions.loadPokemonsSuccess,
    (state, { page }) =>
      pokemonsPaginationAdapter.upsertOne(
        page, {
          ...state,
          loaded: true
        }
      )
  ),
  on(
    PokemonsApiActions.loadPokemonsFailure,
    (state): PokemonsPaginationState => ({
      ...state,
      loaded: true
    })
  ),
  on(
    PokemonsPageActions.setCurrentPage,
    (state, { query }): PokemonsPaginationState => ({
      ...state,
      currentQuery: query,
    })
  )
)

export const pokemonsPaginationFeature = createFeature({
  name: POKEMONS_PAGINATION_FEATURE_KEY,
  reducer
})