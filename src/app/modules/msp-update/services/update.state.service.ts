import { Injectable } from '@angular/core';
import {
    Router,
    UrlTree,
    UrlSegmentGroup,
    PRIMARY_OUTLET,
    UrlSegment,
} from '@angular/router';
import { UpdatePerson } from '@core/models/person.model';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UpdateStateService {
    requestor = new UpdatePerson();

    public hasConsentedToInformationCollection: boolean = environment.bypassInformationCollectionNotice;

    public profileForm: FormGroup;
}
