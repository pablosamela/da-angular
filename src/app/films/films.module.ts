import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsRoutingModule } from './films-routing.module';
import { FilmsComponent } from './films.component';
import { SharedModule } from '../shared/shared.module';
import { FilmsPeopleComponent } from './films-people/films-people.component';


@NgModule({
  declarations: [FilmsComponent, FilmsPeopleComponent],
  imports: [
    CommonModule,
    SharedModule,
    FilmsRoutingModule
  ]
})
export class FilmsModule { }
