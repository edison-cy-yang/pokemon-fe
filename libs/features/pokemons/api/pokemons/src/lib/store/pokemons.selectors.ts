import { createFeatureSelector, createSelector } from '@ngrx/store'
import {
  POKEMONS_FEATURE_KEY,
  PokemonsState,
  pokemonsAdapter,
} from './pokemons.reducer'
import {
  POKEMONS_PAGINATION_FEATURE_KEY,
  PokemonsPaginationState,
  pokemonsPaginationAdapter,
} from './pokemons-pagination.reducer'
import { generatePageQueryHash } from '@pokemon-fe/utils'

export const selectPokemonsState =
  createFeatureSelector<PokemonsState>(POKEMONS_FEATURE_KEY)

export const selectPokemonsPaginationState =
  createFeatureSelector<PokemonsPaginationState>(POKEMONS_PAGINATION_FEATURE_KEY)

const pokemonsEntities = pokemonsAdapter.getSelectors().selectEntities
const pageEntities = pokemonsPaginationAdapter.getSelectors().selectEntities

export const selectPokemonsLoaded = createSelector(
  selectPokemonsState,
  (state: PokemonsState) => state.loaded,
)

export const selectPokemonsError = createSelector(
  selectPokemonsState,
  (state: PokemonsState) => state.error,
)

export const selectPokemonsEntities = createSelector(
  selectPokemonsState,
  (state: PokemonsState) => pokemonsEntities(state),
)

export const selectPokemonsPageEntities = createSelector(
  selectPokemonsPaginationState,
  (state: PokemonsPaginationState) => pageEntities(state),
)

export const selectCurrentPokemonsPageQuery = createSelector(
  selectPokemonsPaginationState,
  (state: PokemonsPaginationState) => state.currentQuery,
)

export const selectPokemonsPageLoaded = createSelector(
  selectPokemonsPageEntities,
  selectCurrentPokemonsPageQuery,
  (entities, query) => {
    const queryHash = generatePageQueryHash('pokemons', query)
    return !!entities[queryHash]
  }
)

export const selectCurrentPokemonsPage = createSelector(
  selectPokemonsPageEntities,
  selectCurrentPokemonsPageQuery,
  (entities, query) => {
    const queryHash = generatePageQueryHash('pokemons', query)
    return entities[queryHash]
  },
)

export const selectPokemonsForCurrentPage = createSelector(
  selectPokemonsEntities,
  selectCurrentPokemonsPage,
  (entities, page) => {
    return page ? page.entityIds.map((id) => entities[id]) : []
  },
)
