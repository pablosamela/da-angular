import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { IFilm } from 'src/app/models/film';
import { IPeople } from 'src/app/models/people';
import { selectCurrentFilm, selectFilmsAndPeopleLength, selectFiteredPeople, selectPeoplePager, selectLoader } from 'src/app/store/films-store/films.selectors';
import { loadFilmPeople, loadFilteredPeople, loader } from 'src/app/store/films-store/films.actions';
import { IPager } from 'src/app/store/films-store/films.state';
import { IStoreState } from 'src/app/store/store.state';
import { LogicService } from 'src/app/services/logic.service';

@Component({
  selector: 'da-films-people',
  templateUrl: './films-people.component.html'
})
export class FilmsPeopleComponent implements OnInit {
  people$: Observable<IPeople[]> = this.store.pipe(select(selectFiteredPeople));
  film$: Observable<IFilm> = this.store.pipe(select(selectCurrentFilm));

  constructor(
    private route: ActivatedRoute, 
    private store: Store<IStoreState>, 
    private logisService: LogicService
    ) { }

  ngOnInit(): void {
    this.route.url.subscribe(() => {
      this.store.dispatch(loader({ isLoading: true }));
      this.logisService.init(
        Number(this.route.snapshot.paramMap.get('page')), 
        Number(this.route.snapshot.paramMap.get('id'))
      ).subscribe();
    });
  }

}
