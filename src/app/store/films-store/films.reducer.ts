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
		const amountPerPpage = payload.peoplePager.amountPerPpage;
		const page = payload.peoplePager.page;
		const count = payload.people.length;

		const startingNumber = (page - 1) * amountPerPpage;
		const startPlusAmount = startingNumber + amountPerPpage;
		const endingNumber = (startPlusAmount <= count) ? startPlusAmount : count;
		const pagesCount = Math.ceil(count / amountPerPpage);

		return {
			...state,
			people: payload.people,
			films: payload.films,
			filteredPeople: payload.people.slice(startingNumber, endingNumber),
			peoplePager: {
				...payload.peoplePager,
				next: page < pagesCount ? page + 1 : 0,
				previous: page > 0 ? page - 1 : 0,
				pagesCount,
				count
			},
			isLoading: payload.isLoading,
		};
	}),
	on(loadFilteredPeopleSuccess, (state, payload) => {
		const amountPerPpage = payload.peoplePager.amountPerPpage;
		const page = payload.peoplePager.page;
		const count = payload.filteredPeople.length;

		const startingNumber = (page - 1) * amountPerPpage;
		const startPlusAmount = startingNumber + amountPerPpage;
		const endingNumber = (startPlusAmount <= count) ? startPlusAmount : count;
		const pagesCount = Math.ceil(count / amountPerPpage);

		return {
			...state,
			filteredPeople: payload.filteredPeople.slice(startingNumber, endingNumber),
			peoplePager: {
				...payload.peoplePager,
				next: page < pagesCount ? page + 1 : 0,
				previous: page > 0 ? page - 1 : 0,
				pagesCount,
				count
			},
			isLoading: payload.isLoading
		};
	})
);

export function reducer(state: IFilmsState = initialFilmsState, action: Action) {
	return filmsReducer(state, action);
}