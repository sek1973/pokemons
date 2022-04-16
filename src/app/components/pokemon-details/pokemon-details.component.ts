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
  loading: boolean = false;

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private dataService: PokemonDetailsService) {
    const val = this.route.snapshot.params['id' as keyof Params] as number;
    this.loading = true;
    this.dataService.fetchData(val)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: data => {
          this.data = data;
          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
