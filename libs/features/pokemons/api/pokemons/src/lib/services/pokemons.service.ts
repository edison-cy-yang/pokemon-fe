import { HttpClient, HttpParams } from '@angular/common/http'
import { Inject, Injectable } from '@angular/core'

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
}