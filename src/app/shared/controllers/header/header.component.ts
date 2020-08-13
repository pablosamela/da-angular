import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'da-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @Input() active: string;
  @Input() title: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
