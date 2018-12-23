import { Component, Input } from '@angular/core';

@Component({
  selector: 'no-result',
  templateUrl: 'no-result.html'
})
export class NoResultComponent {

  @Input() public message: string;

  constructor() { }

}
