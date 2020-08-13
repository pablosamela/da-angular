import { IFilm } from 'src/app/models/film';
import { IPeople } from 'src/app/models/people';

export const filmsFeatureKey = 'films';

export interface IFilmsState {
  isLoading: boolean;
  films: IFilm[];
  people: IPeople[];
  filteredPeople: IPeople[];
  peoplePager: IPager;
}

export interface IPager {
  page: number;
  film: number;
  count: number;
  pagesCount: number;
  next: number;
  previous: number;
  filters: IFilters;
}
export interface IFilters {
  eye_color: string,
  gender: string,
  films:  string
}

export const initialFilterState: IFilters = {
  eye_color: '',
  gender: '',
  films: ''
};

export const initialPeoplePager: IPager = {
  page: 1,
  film: 1,
  count: 1,
  pagesCount: 1,
  next: 2,
  previous: 0,
  filters: initialFilterState
};

export const initialFilmsState: IFilmsState = {
  isLoading: false,
  films: [],
  people: [],
  filteredPeople: [],
  peoplePager: initialPeoplePager
};

