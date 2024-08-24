import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'
import { PageQuery, PaginatedResult } from "@pokemon-fe/utils"
import { EMPTY, Observable } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { Pokemon } from '../classes'

interface ResObject {
  count: number
  next: string
  previous: string
  results: Pokemon[]
}

@Injectable()
export class PokemonsService {
  API: string
  endPoints = {
    pokemons: '/api/pokemons/'
  }

  constructor(
    private http: HttpClient,
    @Inject('API') API: string
  ) {
    this.API = API
  }

  /**
   * Get Pokemons by page
   * @param {PageQuery} query - The page query
   * @returns {Observable<PaginatedResult<Pokemon[]>>} - The response from the server
   */
  getPokemonsByPage(query: PageQuery): Observable<PaginatedResult<Pokemon[]>> {
    const url: string = this.API + this.endPoints.pokemons

    const params = new HttpParams()
      .set('page', query.page.toString())
      .set('perPage', query.perPage.toString())

    return this.http.get<ResObject>(url, { params }).pipe(
      map(
        (res: ResObject) => {
          return {
            count: res.count,
            next: res.next,
            results: res.results as Pokemon[],
          }
        },
        catchError(() => EMPTY)
      )
    )
  }
}