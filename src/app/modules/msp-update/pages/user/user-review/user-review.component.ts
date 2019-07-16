import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MspDirectUpdateReviewContainerComponent
} from '../../../common/msp-direct-update-review-container/msp-direct-update-review-container.component';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { UpdateStateService } from '../../../services/update.state.service';
import * as interfaceObjects from '../shared/i-user';
@Component({
  selector: 'sitereg-update-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss']
})
export class MspDirectUpdateUserReviewComponent implements OnInit {

  @ViewChild(MspDirectUpdateReviewContainerComponent)
  review: MspDirectUpdateReviewContainerComponent;


  constructor(public updateStateService: UpdateStateService, ) { }

  ngOnInit() {

    this.reviewItems();

  }

  reviewItems() {
    this.review.redirectPath = ROUTES_UPDATE.USERS.fullpath;
    this.review.header = ROUTES_UPDATE.USERS.title;

    const form = this.updateStateService.forms.mspUsers.add;
    const infoObject: interfaceObjects.IUser = interfaceObjects.getIUser(form.value);
    if (!infoObject) return;

    this.review.sectionItems = interfaceObjects.getIUserReviewItems(infoObject);
  }




}

