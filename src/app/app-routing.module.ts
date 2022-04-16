import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaughtPokemonsComponent } from './components/caught-pokemons/caught-pokemons.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { WishlistPokemonsComponent } from './components/wishlist-pokemons/wishlist-pokemons.component';

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
    path: 'caught',
    component: CaughtPokemonsComponent,
    pathMatch: 'full'
  },
  {
    path: 'wishlist',
    component: WishlistPokemonsComponent,
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
