import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FilmsStoreModule } from './films-store/films-store.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FilmsStoreModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
  ]
})
export class RootStoreModule { }
