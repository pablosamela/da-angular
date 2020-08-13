import { createReducer, on, Action } from "@ngrx/store";

import { initialFilmsState, IFilmsState, } from './films.state';
import {
	loadFilmsSuccess,
	loadFilmPeople,
	loadFilmPeopleSuccess,
	loadFilteredPeople,
	loadFilteredPeopleSuccess,
	savePeoplePager,
	loader,
	loadFilms
} from './films.actions';

const filmsReducer = createReducer(
	initialFilmsState,
	on(loadFilms, () => initialFilmsState ),
	on(loader, (state, payload) => {
		return {
			...state,
			isLoading: payload.isLoading
		};
	}),
	on(loadFilmsSuccess, (state, payload) => {
		return {
			...state,
			films: payload.films,
			isLoading: payload.isLoading
		};
	}),
	on(loadFilmPeople, loadFilteredPeople, savePeoplePager, (state, payload) => {
		return {
			...state,
			peoplePager: payload.peoplePager
		};
	}),
	on(loadFilmPeopleSuccess, (state, payload) => {
		return {
			...state,
			people: payload.people,
			filteredPeople: payload.filteredPeople,
			peoplePager: payload.peoplePager,
			isLoading: payload.isLoading
		};
	}),
	on(loadFilteredPeopleSuccess, (state, payload) => {
		return {
			...state,
			filteredPeople: payload.filteredPeople,
			peoplePager: payload.peoplePager,
			isLoading: payload.isLoading
		};
	})
);

export function reducer(state: IFilmsState = initialFilmsState, action: Action) {
	return filmsReducer(state, action);
}