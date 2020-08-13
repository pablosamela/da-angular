import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { IFilm } from 'src/app/models/film';
import { IPeople } from 'src/app/models/people';
import { selectCurrentFilm, selectFilmsAndPeopleLength, selectFiteredPeople, selectPeoplePager, selectLoader } from 'src/app/store/films-store/films.selectors';
import { loadFilmPeople, loadFilteredPeople, loader } from 'src/app/store/films-store/films.actions';
import { IPager } from 'src/app/store/films-store/films.state';
import { IStoreState } from 'src/app/store/store.state';

@Component({
  selector: 'da-films-people',
  templateUrl: './films-people.component.html'
})
export class FilmsPeopleComponent implements OnInit {
  filmId: number;
  page: number;
  peoplePager$: Observable<IPager> = this.store.pipe(select(selectPeoplePager));

  people$: Observable<IPeople[]> = this.store.pipe(select(selectFiteredPeople));
  film$: Observable<IFilm> = this.store.pipe(select(selectCurrentFilm), take(1));

  constructor(private route: ActivatedRoute, private store: Store<IStoreState>, private router: Router) { }

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.filmId = Number(this.route.snapshot.paramMap.get('id'));
      this.page = Number(this.route.snapshot.paramMap.get('page'));
      this.store.dispatch(loader({ isLoading: true }));

      combineLatest([
        this.store.pipe(select(selectFilmsAndPeopleLength), take(1)),
        this.store.pipe(select(selectPeoplePager), take(1))
      ]).pipe(
        map(([has, peoplePager]) => {
          if (has.films) {
            if (has.people) {
              this.store.dispatch(loadFilteredPeople({
                peoplePager: {
                  ...peoplePager,
                  page: this.page
                }
              }));
            } else {
              this.store.dispatch(loadFilmPeople({
                peoplePager: {
                  ...peoplePager,
                  film: this.filmId,
                  page: this.page
                }
              }));
            }
          } else {
            this.router.navigateByUrl('/');
          }
        })
      ).subscribe();
    });
  }

}
