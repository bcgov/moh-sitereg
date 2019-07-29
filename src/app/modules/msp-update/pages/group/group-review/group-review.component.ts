import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MspDirectUpdateReviewContainerComponent
} from '../../../common/msp-direct-update-review-container/msp-direct-update-review-container.component';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { UpdateStateService } from '../../../services/update.state.service';
import * as interfaceObjects from '../shared/i-group';
import * as common from '../../../common/update-json-map';

@Component({
  selector: 'sitereg-update-group-review',
  templateUrl: './group-review.component.html',
  styleUrls: ['./group-review.component.scss']
})
export class MspDirectUpdateGroupReviewComponent implements OnInit {

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

    review.redirectPath = ROUTES_UPDATE.GROUP_NUMBERS.fullpath;
    review.header = ROUTES_UPDATE.GROUP_NUMBERS.title;
    const form = this.updateStateService.forms.mspGroups;
    if (!form) return;
    let infoObjects = null;

    if (action === common.actionType.Add) {
      review.header += ' (Add)';
      if(!form.add) return;
      infoObjects = interfaceObjects.getIGroup(form.add.value);
    }

    if (action === common.actionType.Edit) {
      review.header += ' (Update)';
      if(!form.update) return;
      infoObjects = interfaceObjects.getIGroup(form.update.value);
    }

    if (action === common.actionType.Remove) {
      review.header += ' (Remove)';
      if(!form.remove) return;
      infoObjects = interfaceObjects.getIGroup(form.remove.value);
    }

    if (!infoObjects) return;

    const items = interfaceObjects.getIGroupReviewItems(infoObjects);
    review.sectionItems = items;
  }
}
