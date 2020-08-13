import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IStoreState } from 'src/app/store/store.state';
import { selectLoader } from 'src/app/store/films-store/films.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'da-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {

  loader$: Observable<boolean> = this.store.pipe(select(selectLoader));
  
  constructor(private store: Store<IStoreState>) { }

  ngOnInit(): void {
  }

}
