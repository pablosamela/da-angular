import { IFilmsState, initialFilmsState } from './films-store/films.state';

export interface IStoreState {
  films: IFilmsState;
}

export const initialStoreState: IStoreState = {
  films: initialFilmsState
}
