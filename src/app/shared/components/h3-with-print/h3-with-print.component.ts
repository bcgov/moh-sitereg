import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sitereg-msp-h3-with-print',
  templateUrl: './h3-with-print.component.html',
  styleUrls: ['./h3-with-print.component.scss']
})
export class MspH3WithPrintComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
