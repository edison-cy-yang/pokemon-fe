import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from "@ngrx/store"
import { NgxPaginationModule } from 'ngx-pagination'

import {
  PokemonsModule,
  PokemonsPageActions,
  POKEMONS_PER_PAGE,
  Pokemon,
  selectPokemonsLoaded,
  selectCurrentPokemonsPage,
  selectCurrentPokemonsPageQuery,
  selectCurrentPokemonsPageLoaded,
  selectPokemonsForCurrentPage,
} from "@pokemon-fe/pokemons/api/pokemons"
import { Page, PageQuery, MAX_PAGINATION_SIZE } from '@pokemon-fe/utils'
import { PokemonItemComponent } from "@pokemon-fe/pokemons/shared"

@UntilDestroy()
@Component({
  selector: 'pokemons',
  standalone: true,
  imports: [CommonModule, PokemonsModule, PokemonItemComponent, NgxPaginationModule],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss',
})
export class PokemonsComponent implements OnInit{
  pokemons: Pokemon[] = []
  pokemonsPerPage = POKEMONS_PER_PAGE
  maxPaginationSize = MAX_PAGINATION_SIZE
  loaded = false
  currentPage: Page
  currentQuery: PageQuery

  /**
   * Constructor
   * @param store - The NgRX store
   */
  constructor(
    private store: Store
  ) {}

  /**
   * ngOnInit
   */
  ngOnInit(): void {
    // Subscribe to the loaded state of pokemons
    this.store
      .select(selectPokemonsLoaded)
      .pipe(untilDestroyed(this))
      .subscribe((loaded: boolean) => {
        this.loaded = loaded
      })

    // Subscribe to the current page state of pokemons
    this.store
      .select(selectCurrentPokemonsPage)
      .pipe(untilDestroyed(this))
      .subscribe((page: Page) => {
        this.currentPage = page
      })

    // Subscribe to the current page query state
    this.store
      .select(selectCurrentPokemonsPageQuery)
      .pipe(untilDestroyed(this))
      .subscribe((query: PageQuery) => {
        this.currentQuery =  query
      })

    // Check if the current page is loaded, dispatch load action if not
    this.store
      .select(selectCurrentPokemonsPageLoaded)
      .pipe(untilDestroyed(this))
      .subscribe((currentPageLoaded: boolean) => {
        if (!currentPageLoaded) {
          this.store.dispatch(
            PokemonsPageActions.loadPokemons({ query: this.currentQuery})
          )
        }
      })

    // Subscribe to the list of pokemons for the current page
    this.store
      .select(selectPokemonsForCurrentPage)
      .pipe(untilDestroyed(this))
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons
      })
  }

  /**
   * Handles the page change event from the pagination component.
   * Dispatches an action to update the current page in the NgRx store.
   * @param {number} page - The new page number to navigate to.
   */
  onPageChange(page: number): void {
    this.store.dispatch(
      PokemonsPageActions.setCurrentPage({
        query: {
          ...this.currentQuery,
          page,
        },
      })
    )
  }
}
