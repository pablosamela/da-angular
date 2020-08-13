import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { GetIdFromUrlPipe } from './pipes/get-id-from-url.pipe';
import { HeaderComponent } from './controllers/header/header.component';
import { OpeningCrawlComponent } from './controllers/opening-crawl/opening-crawl.component';
import { FilmsWidgetComponent } from './controllers/films-widget/films-widget.component';
import { OpeningCrawlLinkComponent } from './controllers/opening-crawl-link/opening-crawl-link.component';
import { FiltersComponent } from './controllers/filters/filters.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './controllers/loader/loader.component';


@NgModule({
  declarations: [
    GetIdFromUrlPipe, 
    HeaderComponent, 
    OpeningCrawlComponent, 
    OpeningCrawlLinkComponent,
    FilmsWidgetComponent,
    FiltersComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GetIdFromUrlPipe, 
    HeaderComponent, 
    OpeningCrawlComponent, 
    OpeningCrawlLinkComponent,
    FilmsWidgetComponent,
    FiltersComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
