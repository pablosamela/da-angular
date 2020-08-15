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
		const startingNumber = (payload.peoplePager.page - 1) * payload.peoplePager.amountPerPpage;
		const startPlusAmount = startingNumber + payload.peoplePager.amountPerPpage;
		const endingNumber = (startPlusAmount <= payload.people.length) ? startPlusAmount : payload.people.length;
		const pagesCount = Math.ceil(payload.people.length / payload.peoplePager.amountPerPpage);
		
		return {
			...state,
			people: payload.people,
			films: payload.films,
			filteredPeople: payload.people.slice(startingNumber, endingNumber),
			peoplePager: {
				...payload.peoplePager,
				next: payload.peoplePager.page < pagesCount ? payload.peoplePager.page + 1 : 0,
				previous: payload.peoplePager.page > 0 ? payload.peoplePager.page - 1 : 0,
				pagesCount,
				count: payload.people.length
			},
			isLoading: payload.isLoading,
		};
	}),
	on(loadFilteredPeopleSuccess, (state, payload) => {
		const startingNumber = (payload.peoplePager.page - 1) * payload.peoplePager.amountPerPpage;
		const startPlusAmount = startingNumber + payload.peoplePager.amountPerPpage;
		const endingNumber = (startPlusAmount <= payload.filteredPeople.length) ? startPlusAmount : payload.filteredPeople.length;
		const pagesCount = Math.ceil(payload.filteredPeople.length / payload.peoplePager.amountPerPpage);

		return {
			...state,
			filteredPeople: payload.filteredPeople.slice(startingNumber, endingNumber),
			peoplePager: {
				...payload.peoplePager,
				next: payload.peoplePager.page < pagesCount ? payload.peoplePager.page + 1 : 0,
				previous: payload.peoplePager.page > 0 ? payload.peoplePager.page - 1 : 0,
				pagesCount,
				count: payload.filteredPeople.length
			},
			isLoading: payload.isLoading
		};
	})
);

export function reducer(state: IFilmsState = initialFilmsState, action: Action) {
	return filmsReducer(state, action);
}