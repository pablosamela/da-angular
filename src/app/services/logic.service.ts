import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { selectFilmsAndPeopleLength, selectPeoplePager } from '../store/films-store/films.selectors';
import { loadFilteredPeople, loadFilmPeople } from '../store/films-store/films.actions';
import { IStoreState } from '../store/store.state';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor(private store: Store<IStoreState>, private router: Router) { }

  init(page: number, film: number): Observable<void> {
    return combineLatest([
      this.store.pipe(select(selectFilmsAndPeopleLength), take(1)),
      this.store.pipe(select(selectPeoplePager), take(1))
    ]).pipe(
      map(([has, peoplePager]) => {
        if (has.films && has.people) {
          this.store.dispatch(loadFilteredPeople({
            peoplePager: {
              ...peoplePager,
              page
            }
          }));
        } else {
          this.store.dispatch(loadFilmPeople({
            peoplePager: {
              ...peoplePager,
              film,
              page
            }
          }));
        }
      })
    )
  }

}
