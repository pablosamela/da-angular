import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IFilm } from 'src/app/models/film';

@Component({
  selector: 'da-opening-crawl',
  templateUrl: './opening-crawl.component.html',
  styleUrls: ['./opening-crawl.component.sass']
})
export class OpeningCrawlComponent {
  
  constructor(
    public dialogRef: MatDialogRef<OpeningCrawlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFilm) {}

}
