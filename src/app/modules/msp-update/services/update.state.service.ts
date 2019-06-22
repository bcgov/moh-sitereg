import { Injectable } from '@angular/core';
import { UpdatePerson } from '@core/models/person.model';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UpdateStateService {
    requestor = new UpdatePerson();

    public hasConsentedToInformationCollection: boolean = environment.bypassInformationCollectionNotice;

    /**
     * Contains all form objects for Update as separate entries.
     *
     * Form values are not initialized by default and must be set by component.
     */
    public forms: UpdateFormTypes = {
      // AddRemoveUpdate fields can have objects initialized for convenience so
      // the sub-types can be accessed directly.
      signingAuthority: {} as AddRemoveUpdate,

      mspGroups: {} as AddRemoveUpdate,
    };
}

export interface UpdateFormTypes {
  signingAuthority?: AddRemoveUpdate;
  organizationForm?: FormGroup;
  profileForm?: FormGroup;
  mspGroups?: AddRemoveUpdate;
}

export interface AddRemoveUpdate {
  add: FormGroup;
  remove: FormGroup;
  update: FormGroup;
}
