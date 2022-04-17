import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TreeNode } from 'projects/common/src/lib/components/tree/tree.component';
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

  treeData: TreeNode[] = [];

  private destroyed$: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute, private dataService: PokemonDetailsService) {
    const val = this.route.snapshot.params['id' as keyof Params] as number;
    this.loading = true;
    this.dataService.fetchData(val)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: data => {
          this.data = data;
          this.treeData = this.convertToTreeData(data);
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

  private convertToTreeData(data: any): TreeNode[] {
    if (data === null || data === undefined) { return []; }
    if (Array.isArray(data)) {
      const result: TreeNode[] = [];
      for (const [index, datum] of data.entries()) {
        result.push({ name: index.toString(), children: this.convertToTreeData(datum) });
      }
      return result;
    } else if (typeof data === 'object') {
      const keys = Object.keys(data);
      const result: TreeNode[] = [];
      for (const key of keys) {
        result.push({ name: key, children: this.convertToTreeData(data[key]) });
      }
      return result;
    } else {
      return [{ name: data.toString() }];
    }
  }

}
