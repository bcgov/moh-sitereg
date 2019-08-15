import { Component, OnInit, ViewChild } from '@angular/core';
import {
    MspDirectUpdateReviewContainerComponent
} from '../../../common/msp-direct-update-review-container/msp-direct-update-review-container.component'; // prettier-ignore
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { UpdateStateService } from '../../../services/update.state.service';
import * as interfaceObjects from '../shared/i-organization';

@Component({
    selector: 'sitereg-update-organization-review',
    templateUrl: './organization-review.component.html',
    styleUrls: ['./organization-review.component.scss'],
})
export class MspDirectUpdateOrganizationReviewComponent implements OnInit {
    @ViewChild(MspDirectUpdateReviewContainerComponent)
    review: MspDirectUpdateReviewContainerComponent;

    constructor(public updateStateService: UpdateStateService) {}

    ngOnInit() {
        this.reviewItems();
    }

    reviewItems() {
        this.review.redirectPath = ROUTES_UPDATE.ORGANIZATION.fullpath;
        this.review.header = ROUTES_UPDATE.ORGANIZATION.title;

        const form = this.updateStateService.forms.organizationForm;
        if (!form) return;
        const infoObject: interfaceObjects.IOrganizationEdit = interfaceObjects.getIOrganizationEdit(
            form.value
        );
        if (!infoObject) return;
        const items = [
            [
                {
                    label: 'Organization name',
                    value: infoObject.organizationName,
                },
                { label: 'Suite', value: infoObject.suite },
                { label: 'Street', value: infoObject.street },
                { label: 'Street Name', value: infoObject.streetName },
                { label: 'Address Line2', value: infoObject.addressLine2 },
                { label: 'City', value: infoObject.city },
                { label: 'Postal Code', value: infoObject.postalCode },
                { label: 'Province', value: infoObject.province },
                {
                    label: 'Administering for',
                    value: infoObject.administeringFor,
                },
            ],
        ];
        this.review.sectionItems = items;
    }
}
