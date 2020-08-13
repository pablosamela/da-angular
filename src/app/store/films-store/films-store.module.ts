import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import  * as fromFilmsStore from './films.reducer';
import { FilmsEffects } from './films.effects';
import { filmsFeatureKey } from './films.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(filmsFeatureKey, fromFilmsStore.reducer),
    EffectsModule.forFeature([FilmsEffects])
  ]
})
export class FilmsStoreModule { }
