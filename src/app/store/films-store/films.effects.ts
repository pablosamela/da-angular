import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { combineLatest, forkJoin } from 'rxjs';
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
  selectCurrentFilm,
  selectPeoplePager, 
  selectAndProcessPeople
} from './films.selectors';

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
        return combineLatest([
          this.store.pipe(select(selectCurrentFilm), take(1)),
          this.store.pipe(select(selectPeoplePager), take(1))
        ]).pipe(
          mergeMap(([film, peoplePager]) => {
            const charactersObserbable = film?.characters.map(characterUrl =>
              this.dataService.get<IPeople>(characterUrl)
            );
            return forkJoin(charactersObserbable).pipe(
              map((people: IPeople[]) => {

                const filteredPeople = people.slice(0, siteConfig.pageAmount);

                peoplePager = {
                  ...peoplePager,
                  count: people.length,
                  next: peoplePager.page + 1,
                  previous: 0,
                  pagesCount: Math.ceil(people.length / siteConfig.pageAmount),

                }

                return loadFilmPeopleSuccess({ people, filteredPeople, peoplePager, isLoading: false });
              })
            );
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
            peoplePager = {
              ...peoplePager,
              next: peoplePager.page + 1,
              previous: peoplePager.page > 0 ? peoplePager.page - 1 : 0,
              pagesCount: Math.ceil(filteredPeople.length / siteConfig.pageAmount),
              count: filteredPeople.length
            }
            const startingNumber = (peoplePager.page - 1) * siteConfig.pageAmount;
            const startPlusAmount = startingNumber + siteConfig.pageAmount;
            const endingNumber = (startPlusAmount <= filteredPeople.length) ? startPlusAmount : filteredPeople.length;

            filteredPeople = filteredPeople.slice(startingNumber, endingNumber);

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