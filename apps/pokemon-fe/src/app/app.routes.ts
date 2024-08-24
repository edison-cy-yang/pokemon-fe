import { Route } from '@angular/router'

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'pokemons',
    pathMatch: 'full',
  },
  {
    path: 'pokemons',
    loadChildren: () =>
      import('@pokemon-fe/pokemons/pages').then(
        (m) => m.pokemonsPagesPokemonsRoutes
      )
  }
]
