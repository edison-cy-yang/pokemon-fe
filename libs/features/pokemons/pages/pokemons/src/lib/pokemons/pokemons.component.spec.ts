import { ComponentFixture, TestBed } from '@angular/core/testing'
import { PokemonsPagesComponent } from './pokemons.component'

describe('PokemonsPagesComponent', () => {
  let component: PokemonsPagesComponent
  let fixture: ComponentFixture<PokemonsPagesComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonsPagesComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(PokemonsPagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
