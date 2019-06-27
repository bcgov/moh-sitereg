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
      mspAccessAdministrators: {} as AddRemoveUpdate,
      mspUsers: {} as AddRemoveUpdate,
      mspGroups: {} as AddRemoveUpdate,
    };

    /**
     * Track if user has selected they have form updates.  If this value is
     * TRUE, then forms.profileForms must not be null.
     *
     * The reason we have this in the service is to persist user's action.
     */
    public hasOrganizationUpdates: boolean;
}

export interface UpdateFormTypes {
  signingAuthority?: AddRemoveUpdate;
  organizationForm?: FormGroup;
  profileForm?: FormGroup;
  mspAccessAdministrators?: AddRemoveUpdate;
  mspUsers?: AddRemoveUpdate;
  mspGroups?: AddRemoveUpdate;
}

export interface AddRemoveUpdate {
  add: FormGroup;
  remove: FormGroup;
  update: FormGroup;
}
