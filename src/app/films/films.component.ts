import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IFilm } from 'src/app/models/film';
import { IStoreState } from 'src/app/store/store.state';
import { selectAllFilms } from 'src/app/store/films-store/films.selectors';
import { loadFilms, loader } from 'src/app/store/films-store/films.actions';

@Component({
  selector: 'da-films',
  templateUrl: './films.component.html'
})
export class FilmsComponent implements OnInit {

  films$: Observable<IFilm[]> = this.store.pipe(select(selectAllFilms));

  constructor(private route: ActivatedRoute, private store: Store<IStoreState>) { }

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.store.dispatch(loader({ isLoading: true }));
      this.store.dispatch(loadFilms());
    });
  }
}
