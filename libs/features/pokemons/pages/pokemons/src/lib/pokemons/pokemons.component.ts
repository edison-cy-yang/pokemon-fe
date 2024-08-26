import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { Store } from "@ngrx/store"

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
import { Page, PageQuery } from '@pokemon-fe/utils'

@UntilDestroy()
@Component({
  selector: 'pokemons',
  standalone: true,
  imports: [CommonModule, PokemonsModule],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss',
})
export class PokemonsComponent implements OnInit{
  pokemons: Pokemon[] = []
  pokemonsPerPage = POKEMONS_PER_PAGE
  loaded = false
  currentPage: Page
  currentQuery: PageQuery

  constructor(
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store
      .select(selectPokemonsLoaded)
      .pipe(untilDestroyed(this))
      .subscribe((loaded: boolean) => {
        this.loaded = loaded
      })

    this.store
      .select(selectCurrentPokemonsPage)
      .pipe(untilDestroyed(this))
      .subscribe((page: Page) => {
        this.currentPage = page
      })

    this.store
      .select(selectCurrentPokemonsPageQuery)
      .pipe(untilDestroyed(this))
      .subscribe((query: PageQuery) => {
        this.currentQuery =  query
      })

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

    this.store
      .select(selectPokemonsForCurrentPage)
      .pipe(untilDestroyed(this))
      .subscribe((pokemons: Pokemon[]) => {
        this.pokemons = pokemons
      })
  }
}
