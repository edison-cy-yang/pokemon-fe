import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Pokemon } from "@pokemon-fe/pokemons/api/pokemons"

@Component({
  selector: 'pokemon-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.scss',
})
export class PokemonItemComponent {
  @Input() pokemon: Pokemon
}
