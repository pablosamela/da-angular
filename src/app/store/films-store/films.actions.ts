import { createAction, props } from '@ngrx/store';

import { IFilm } from 'src/app/models/film';
import { IPeople } from 'src/app/models/people';
import { IPager } from '../films-store/films.state';

export const loader = createAction(
  '[Loader] Show Loader',
  props<{ isLoading: boolean }>()
);

export const loadFilms = createAction(
  '[Films] Load Films'
);

export const loadFilmsSuccess = createAction(
  '[Films] Load Films Success',
  props<{ films: IFilm[], isLoading: boolean }>()
);

export const loadFilmPeople = createAction(
  '[People] Load Films People',
  props<{ peoplePager: IPager }>()
);

export const loadFilmPeopleSuccess = createAction(
  '[People] Load Films People Success',
  props<{ films: IFilm[], people: IPeople[], peoplePager: IPager, isLoading: boolean }>()
);

export const loadFilteredPeople = createAction(
  '[People] Load Filtered Films People',
  props<{ peoplePager: IPager }>()
);

export const loadFilteredPeopleSuccess = createAction(
  '[People] Load Filtered Films People Success',
  props<{ filteredPeople: IPeople[], peoplePager: IPager, isLoading: boolean }>()
);


export const savePeoplePager = createAction(
  '[People] Save People Filters',
  props<{ peoplePager: IPager }>()
);