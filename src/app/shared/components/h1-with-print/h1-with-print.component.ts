import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sitereg-msp-h1-with-print',
  templateUrl: './h1-with-print.component.html',
  styleUrls: ['./h1-with-print.component.scss']
})
export class MspH1WithPrintComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
