import { createSelector } from '@ngrx/store';

import { IFilm } from 'src/app/models/film';
import { IPeople } from 'src/app/models/people';
import { getIdFromUrl } from 'src/app/shared/utils/utils';
import { IStoreState } from '../store.state';
import { IFilmsState, } from './films.state';

export const selectFilmsState = (state: IStoreState) => state.films;

export const selectLoader = createSelector(
	selectFilmsState,
	(filmsState: IFilmsState) => filmsState?.isLoading
);

export const selectAllFilms = createSelector(
	selectFilmsState,
	(filmsState: IFilmsState) => filmsState?.films
);

export const selectAllPeople = createSelector(
	selectFilmsState,
	(filmsState: IFilmsState) => filmsState?.people
);

export const selectFiteredPeople = createSelector(
	selectFilmsState,
	(filmsState: IFilmsState) => filmsState.filteredPeople
);

export const selectAndProcessPeople = createSelector(
	selectFilmsState,
	(filmsState: IFilmsState) => {
		const people = filmsState.people;
		const peoplePager = filmsState.peoplePager;
		const filtersCount = [...Object.values(filmsState.peoplePager.filters)];
		const enabledFilters = filtersCount.filter(value => value != '').length;

		const filteredPeople = people.filter(person => {
			const eyeColorFilter = (person.eye_color === peoplePager.filters.eye_color);
			const genderFilter = (person.gender === peoplePager.filters.gender);
			const filmsFilter = (person.films.includes(peoplePager.filters.films));
			let filterValidity = true;

			if(enabledFilters === 3){
				filterValidity = (eyeColorFilter && genderFilter && filmsFilter);
			} else if(enabledFilters === 2){
				filterValidity = (eyeColorFilter && genderFilter) || ( genderFilter && filmsFilter) || (eyeColorFilter && filmsFilter);
			} else if(enabledFilters === 1){
				filterValidity = (eyeColorFilter || genderFilter || filmsFilter);
			}

			return filterValidity;
		});
		
		return filteredPeople;
	}
);

export const selectCurrentFilm = createSelector(
	selectFilmsState,
	(filmsState: IFilmsState) => {
		const currentFilm = filmsState.films?.filter(film => getIdFromUrl(film.url) === filmsState?.peoplePager.film)
		return currentFilm[0];
	}
);

export const selectFilmsAndPeopleLength = createSelector(
	selectAllFilms,
	selectAllPeople,
	(films: IFilm[], people: IPeople[]) => {
		return {
			films: !!(films?.length > 0),
			people: !!(people?.length > 0)
		}
	}
);

export const selectAPersonFilms = (personUrl: string) => createSelector(
	selectAllFilms,
	(films: IFilm[]) => films.filter(film => film.characters.includes(personUrl))
);


export const selectPeoplePager = createSelector(
	selectFilmsState,
	(filmsState: IFilmsState) => filmsState.peoplePager
);

export const selectEyeColorsFilter = createSelector(
	selectAllPeople,
	(people: IPeople[]) => [...new Set(people?.map(person => person.eye_color))]
);

export const selectGendersFilter = createSelector(
	selectAllPeople,
	(people: IPeople[]) => [...new Set(people?.map(person => person.gender))]
);
