import { Injectable } from "@angular/core"
import { createEffect, Actions, ofType } from "@ngrx/effects"
import { PaginatedResult, generatePageQueryHash } from "@pokemon-fe/utils"
import { fetch } from "@ngrx/router-store/data-persistence"
import { map } from "rxjs/operators"
import { Pokemon } from "../classes"
import { PokemonsService } from "../services"
import { PokemonsApiActions, PokemonsPageActions } from "./pokemons.actions"

@Injectable()
export class PokemonsEffects {
  /**
   * Constructor
   * @param actions$ - NgRX actions
   * @param pokemonsService - PokemonsService
   */
  constructor(
    private actions$: Actions,
    private pokemonsService: PokemonsService,
  ) {}

  /**
   * getPokemons$ effect
   * - sets page data and dispatches success action on success
   * - dispatches failure action on error
   */
  getPokemons$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PokemonsPageActions.loadPokemons),
      fetch({
        run: (action) => {
          return this.pokemonsService.getPokemonsByPage(action.query).pipe(
            map((data: PaginatedResult<Pokemon[]>) => 
              PokemonsApiActions.loadPokemonsSuccess({
                page: {
                  id: generatePageQueryHash('pokemons', action.query),
                  query: action.query,
                  totalCount: data.count,
                  entityIds: data.results.map((pokemon) => pokemon.id)
                },
                pokemons: data.results
              })
            )
          )
        },
        onError: (_, error) => {
          console.error('Error - getPokemons: ', error)
          return PokemonsApiActions.loadPokemonsFailure({ error })
        }
      })
    )
  })
}