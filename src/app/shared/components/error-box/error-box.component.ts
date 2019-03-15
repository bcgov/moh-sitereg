import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'sitereg-error-box',
  templateUrl: './error-box.component.html',
  styleUrls: ['./error-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorBoxComponent implements OnInit {
  @Input() error: boolean;
  @Input() errorMessage: string;

  constructor() {}

  ngOnInit() {}
}
