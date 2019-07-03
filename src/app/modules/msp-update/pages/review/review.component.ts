import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateStateService } from '../../services/update.state.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { ReviewItemInterface } from '../../components/review-section/review-section.component';

@Component({
  selector: 'sitereg-msp-update-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class MspUpdateReviewComponent implements OnInit {

  constructor( private router: Router,
               private updateStateService: UpdateStateService ) {

  }

  ngOnInit() {
  }

  continue() {
    return true;
  }

  // Methods for displaying data
  getRequesterData(): ReviewItemInterface[] {
    return [
      { label: 'Organization Number', value: ''},
      { label: 'Email Address', value: '' },
    ] as ReviewItemInterface[];
  }

  getOrgData(): ReviewItemInterface[] {
    return [
      { label: 'Organization Name', value: ''},
      { label: 'Suit #', value: '' },
      { label: 'Street #', value: '' },
      { label: 'Street Name', value: '' },
      { label: 'Address Line 2 (Optional)', value: '' },
      { label: 'City', value: '' },
      { label: 'Province', value: '' },
      { label: 'Postal', value: '' },
    ] as ReviewItemInterface[];
  }

  getAddSignAuthData(): ReviewItemInterface[] {
    return [
      { label: 'Title', value: ''},
      { label: 'First Name', value: '' },
      { label: 'Initial', value: '' },
      { label: 'Last Name', value: '' },
      { label: 'Email Address', value: '' },
      { label: 'Confirmed Email Address', value: '' },
      { label: 'Phone', value: '' },
      { label: 'Ext', value: '' },
      { label: 'Fax', value: '' },
      { label: 'Does Signing Authority require access to MSP Direct?', value: '' },
      { label: 'The Person will be administering MSP for', value: '' }
    ] as ReviewItemInterface[];
  }


  // Methods to navigate to pages to edit data
  editRequesterData() {
    this.router.navigate([ROUTES_UPDATE.IDENTIFY.fullpath]);
  }

  editOrgData() {
    this.router.navigate([ROUTES_UPDATE.ORGANIZATION.fullpath]);
  }

  editSignAuthData() {
    this.router.navigate([ROUTES_UPDATE.SIGNING_AUTHORITY.fullpath]);
  }

  editUserData() {
    this.router.navigate([ROUTES_UPDATE.USERS.fullpath]);
  }

  editGroupData() {
    this.router.navigate([ROUTES_UPDATE.GROUP_NUMBERS.fullpath]);
  }

}
