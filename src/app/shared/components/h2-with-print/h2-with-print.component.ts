import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sitereg-msp-h2-with-print',
  templateUrl: './h2-with-print.component.html',
  styleUrls: ['./h2-with-print.component.scss']
})
export class MspH2WithPrintComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}
