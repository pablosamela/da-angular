import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmsComponent } from './films.component';
import { FilmsPeopleComponent } from './films-people/films-people.component';

const routes: Routes = [
  { path: '', component: FilmsComponent },
  { path: 'people/:id/:page', component: FilmsPeopleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmsRoutingModule { }
