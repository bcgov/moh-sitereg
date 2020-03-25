import { Component, OnInit, ViewChild } from '@angular/core';

import {
    MspDirectUpdateReviewContainerComponent
} from '../../../common/msp-direct-update-review-container/msp-direct-update-review-container.component'; // prettier-ignore

import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { UpdateStateService } from '../../../services/update.state.service';
import * as interfaceObjects from '../shared/i-requestor';
@Component({
    selector: 'sitereg-update-requestor-review',
    templateUrl: './requestor-review.component.html',
    styleUrls: ['./requestor-review.component.scss'],
})
export class MspDirectUpdateRequestorReviewComponent implements OnInit {
    @ViewChild(MspDirectUpdateReviewContainerComponent, { static: true })
    review: MspDirectUpdateReviewContainerComponent;

    constructor(public updateStateService: UpdateStateService) {}

    ngOnInit() {
        this.reviewItems();
    }

    reviewItems() {
        this.review.redirectPath = ROUTES_UPDATE.REQUESTOR.fullpath;
        this.review.header = ROUTES_UPDATE.REQUESTOR.title;

        const form = this.updateStateService.forms.requestorForm;
        if (!form) return;
        const infoObject: interfaceObjects.IRequestor = interfaceObjects.getIRequestor(
            form.value
        );
        if (!infoObject) return;
        const items = [
            [
                {
                    label: 'Organization Number',
                    value: infoObject.organizationNumber,
                },
                { label: 'Email Address', value: infoObject.emailAddress },
            ],
        ];
        this.review.sectionItems = items;
    }
}
