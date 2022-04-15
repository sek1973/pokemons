import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { PokemonDetailsService } from 'src/app/services/pokemon-details.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {

  data!: Object;

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private dataService: PokemonDetailsService) {
    const val = this.route.snapshot.params['id' as keyof Params] as number;
    this.dataService.fetchData(val)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => this.data = data);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
