import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IFilm } from 'src/app/models/film';
import { OpeningCrawlComponent } from '../opening-crawl/opening-crawl.component';

@Component({
  selector: 'da-opening-crawl-link',
  templateUrl: './opening-crawl-link.component.html'
})
export class OpeningCrawlLinkComponent {
  @Input() film: IFilm;

  constructor(public dialog: MatDialog) { }

  openingCrawler() {
    const dialogRef = this.dialog.open(OpeningCrawlComponent, {
      panelClass: 'opening-crawl' ,
      height: '80%',
      width: '80%',
      data: this.film
    });
  }
  
}
