import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PokemonDetailsService } from 'src/app/services/pokemon-details.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private dataService: PokemonDetailsService) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
