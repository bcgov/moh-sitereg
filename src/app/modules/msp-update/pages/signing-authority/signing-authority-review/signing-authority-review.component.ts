import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MspDirectUpdateReviewContainerComponent
} from '../../../common/msp-direct-update-review-container/msp-direct-update-review-container.component';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { UpdateStateService } from '../../../services/update.state.service';
import * as interfaceObjects from '../shared/i-signing-authority';
import * as common from '../../../common/update-json-map';

@Component({
  selector: 'sitereg-update-signing-authority-review',
  templateUrl: './signing-authority-review.component.html',
  styleUrls: ['./signing-authority-review.component.scss']
})
export class MspDirectUpdateSigningAuthorityReviewComponent implements OnInit {

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

    review.redirectPath = ROUTES_UPDATE.SIGNING_AUTHORITY.fullpath;
    review.header = ROUTES_UPDATE.SIGNING_AUTHORITY.title;
    const form = this.updateStateService.forms.signingAuthority;
    let infoObjects = null;

    if (action === common.actionType.Add) {
      review.header += ' (Add)';
      if (!form.add) return;
      infoObjects = interfaceObjects.getISigningAuthority(form.add.value);
    }

    if (action === common.actionType.Edit) {
      review.header += ' (Update)';
      if (!form.update) return;
      infoObjects = interfaceObjects.getISigningAuthority(form.update.value);
    }

    if (action === common.actionType.Remove) {
      review.header += ' (Remove)';
      if (!form.remove) return;
      console.log(form.remove.value);
      infoObjects = interfaceObjects.getISigningAuthority(form.remove.value);
    }

    if (!infoObjects) return;

    const items = interfaceObjects.getISigningAuthorityReviewItems(infoObjects);
    review.sectionItems = items;
  }


}

