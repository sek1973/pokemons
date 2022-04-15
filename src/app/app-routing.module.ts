import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';

const routes: Routes = [
  {
    path: '',
    component: PokemonsComponent
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetailsComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
