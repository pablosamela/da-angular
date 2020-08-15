import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { combineLatest, forkJoin, iif } from 'rxjs';
import { flatMap, map, mergeMap, take } from 'rxjs/operators';

import { DataService } from 'src/app/services/data.service';
import { ApiResponse } from 'src/app/models/api-response';
import { IFilm } from 'src/app/models/film';
import { IPeople } from 'src/app/models/people';
import { siteConfig } from 'src/app/shared/config';
import {
  loadFilms,
  loadFilmsSuccess,
  loadFilmPeople,
  loadFilmPeopleSuccess,
  loadFilteredPeople,
  loadFilteredPeopleSuccess,
  savePeoplePager
} from './films.actions';
import { filmsFeatureKey } from './films.state';
import { IStoreState } from '../store.state';
import {
  selectPeoplePager,
  selectAndProcessPeople,
  selectAllFilms,
  selectFilmsAndPeopleLength
} from './films.selectors';
import { getIdFromUrl } from 'src/app/shared/utils/utils';

@Injectable()
export class FilmsEffects {

  loadFilms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFilms),
      flatMap(action => {
        const url = `${siteConfig.api}${filmsFeatureKey}/`;
        return combineLatest([this.dataService.get<ApiResponse<IFilm>>(url)]).pipe(
          map(([response]) => {
            return loadFilmsSuccess({ films: response.results, isLoading: false });
          })
        )
      })
    )
  );

  loadFilmPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFilmPeople),
      flatMap(action => {
        return this.store.pipe(
          select(selectFilmsAndPeopleLength), take(1),
          map(has => {
            return iif(() => has.films,
              this.store.pipe(select(selectAllFilms), take(1)),
              this.dataService.get<ApiResponse<IFilm>>(`${siteConfig.api}${filmsFeatureKey}/`).pipe(map(result => result.results))
            )
          }),
          mergeMap(film$ => {
            return combineLatest([
              film$,
              this.store.pipe(select(selectPeoplePager), take(1))
            ]).pipe(
              mergeMap(([films, peoplePager]) => {
                const currentFilm = films?.filter(film => getIdFromUrl(film.url) === peoplePager.film);

                const charactersObserbable = currentFilm[0]?.characters.map(characterUrl =>
                  this.dataService.get<IPeople>(characterUrl)
                );
                return forkJoin(charactersObserbable).pipe(
                  map((people: IPeople[]) => {
                    return loadFilmPeopleSuccess({ films, people, peoplePager, isLoading: false });
                  })
                );
              })
            )
          })
        )
      })
    )
  );

  loadFilteredPeople$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFilteredPeople, savePeoplePager),
      flatMap(action => {
        return combineLatest([
          this.store.pipe(select(selectAndProcessPeople), take(1)),
          this.store.pipe(select(selectPeoplePager), take(1))
        ]).pipe(
          map(([filteredPeople, peoplePager]) => {
            return loadFilteredPeopleSuccess({ filteredPeople, peoplePager, isLoading: false });
          })
        )
      })
    )
  );

  constructor(
    private actions$: Actions,
    private dataService: DataService,
    private store: Store<IStoreState>
  ) { }
}