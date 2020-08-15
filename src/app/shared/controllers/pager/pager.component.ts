import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IPager } from 'src/app/store/films-store/films.state';
import { selectPeoplePager } from 'src/app/store/films-store/films.selectors';
import { IStoreState } from 'src/app/store/store.state';

@Component({
  selector: 'da-pager',
  templateUrl: './pager.component.html'
})
export class PagerComponent {
  peoplePager$: Observable<IPager> = this.store.pipe(select(selectPeoplePager));

  constructor(private store: Store<IStoreState>) { }
}
