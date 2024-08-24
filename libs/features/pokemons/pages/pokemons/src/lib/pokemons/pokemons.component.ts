import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'pokemons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemons.component.html',
  styleUrl: './pokemons.component.scss',
})
export class PokemonsComponent {}
