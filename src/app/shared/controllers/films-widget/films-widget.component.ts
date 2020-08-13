import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IFilm } from 'src/app/models/film';
import { selectAPersonFilms } from 'src/app/store/films-store/films.selectors';
import { IStoreState } from 'src/app/store/store.state';

@Component({
  selector: 'da-films-widget',
  templateUrl: './films-widget.component.html'
})
export class FilmsWidgetComponent implements OnInit {

  @Input() url: string;
  
  films$: Observable<IFilm[]>;
  
  constructor(private store: Store<IStoreState>) { }

  ngOnInit(): void {
    this.films$ = this.store.pipe(select(selectAPersonFilms(this.url)));
  }
}
