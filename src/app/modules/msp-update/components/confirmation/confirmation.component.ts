import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';

@Component({
  selector: 'sitereg-msp-update-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass']
})
export class MspDirectUpdateConfirmationComponent implements OnInit {

  constructor(
    private router: Router,
    private progressService: MspDirectUpdateProgressService
) { }

ngOnInit() {
    this.progressService.setItemIncomplete();
}

continue() {
    this.progressService.enableConfirmation = false;
    this.progressService.setItemComplete();
    this.router.navigate([ROUTES_UPDATE.IDENTIFY.fullpath]);
}

}
