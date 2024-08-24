import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { PokemonsModule } from "@pokemon-fe/pokemons/api/pokemons"

@Component({
  selector: 'pokemons',
  standalone: true,
  imports: [CommonModule, PokemonsModule],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss',
})
export class PokemonsComponent {}
