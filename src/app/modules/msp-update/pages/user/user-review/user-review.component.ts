import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MspDirectUpdateReviewContainerComponent
} from '../../../common/msp-direct-update-review-container/msp-direct-update-review-container.component';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { UpdateStateService } from '../../../services/update.state.service';
import * as interfaceObjects from '../shared/i-user';
import * as common from '../../../common/update-json-map';

@Component({
  selector: 'sitereg-update-user-review',
  templateUrl: './user-review.component.html',
  styleUrls: ['./user-review.component.scss']
})
export class MspDirectUpdateUserReviewComponent implements OnInit {

  @ViewChild('add')
  add: MspDirectUpdateReviewContainerComponent;
  @ViewChild('remove')
  remove: MspDirectUpdateReviewContainerComponent;
  @ViewChild('edit')
  edit: MspDirectUpdateReviewContainerComponent;




  constructor(public updateStateService: UpdateStateService, ) { }

  ngOnInit() {

    this.reviewItems(common.actionType.Add, this.add);
    this.reviewItems(common.actionType.Edit, this.edit);
    this.reviewItems(common.actionType.Remove, this.remove);

  }

  reviewItems(action: common.actionType, review: MspDirectUpdateReviewContainerComponent) {

    review.redirectPath = ROUTES_UPDATE.USERS.fullpath;
    review.header = ROUTES_UPDATE.USERS.title;
    const form = this.updateStateService.forms.mspUsers;
    let infoObjects = null;

    if (action === common.actionType.Add) {
      review.header += ' (Add)';
      if (!form.add) return;
      infoObjects = interfaceObjects.getIUser(form.add.value);
    }

    if (action === common.actionType.Edit) {
      review.header += ' (Update)';
      if (!form.update) return;
      infoObjects = interfaceObjects.getIUser(form.update.value);
    }

    if (action === common.actionType.Remove) {
      review.header += ' (Remove)';
      if (!form.remove) return;
      // console.log(form.remove.value);
      infoObjects = interfaceObjects.getIUser(form.remove.value);
    }

    if (!infoObjects) return;

    const items = interfaceObjects.getIUserReviewItems(infoObjects);
    review.sectionItems = items;
  }


}

