import { Component, Input } from '@angular/core';

@Component({
  selector: 'da-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() active: string;
  @Input() title: string;
  
  constructor() { }

}
