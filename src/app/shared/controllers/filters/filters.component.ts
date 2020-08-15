import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { IFilm } from 'src/app/models/film';
import { IStoreState } from 'src/app/store/store.state';
import { IPager, IFilters, initialFilterState } from 'src/app/store/films-store/films.state';
import { selectEyeColorsFilter, selectGendersFilter, selectAllFilms, selectPeoplePager } from 'src/app/store/films-store/films.selectors';
import { savePeoplePager } from 'src/app/store/films-store/films.actions';

@Component({
  selector: 'da-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit {
  filtersGroup: FormGroup;
  eyeFilter$: Observable<string[]> = this.store.pipe(select(selectEyeColorsFilter));
  genderFilter$: Observable<string[]> = this.store.pipe(select(selectGendersFilter));
  filmsFilter$: Observable<IFilm[]> = this.store.pipe(select(selectAllFilms));
  peoplePager: IPager;
  selectedFilters: IFilters;

  constructor(
    private store: Store<IStoreState>,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(selectPeoplePager), take(1))
    .subscribe(peoplePager => {
      this.peoplePager = peoplePager;
      this.selectedFilters = peoplePager.filters;
      this.filtersGroup = this.formBuilder.group({
        eyeColor: new FormControl(this.selectedFilters.eye_color),
        gender: new FormControl(this.selectedFilters.gender),
        films: new FormControl(this.selectedFilters.films),
      });
    });
  }

  savePager() {
    this.router.navigate(['/films/people',this.peoplePager.film,'1']);
    this.store.dispatch(savePeoplePager({
      peoplePager: {
        ...this.peoplePager,
        filters: this.selectedFilters
      }
    }));
  }

  onEyeColorChange(event) {
    this.selectedFilters = {
      ...this.selectedFilters,
      eye_color: event.currentTarget.value
    };
    this.savePager();
  }

  onGenderChange(event) {
    this.selectedFilters = {
      ...this.selectedFilters,
      gender: event.currentTarget.value
    };
    this.savePager();
  }

  onFilmsChange(event) {
    this.selectedFilters = {
      ...this.selectedFilters,
      films: event.currentTarget.value
    };
    this.savePager();
  }

  onClearClick() {
    this.selectedFilters = initialFilterState;
    this.savePager();
  }
}
