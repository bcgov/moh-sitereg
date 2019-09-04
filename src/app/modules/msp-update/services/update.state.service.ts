import { Injectable } from '@angular/core';
import { UpdatePerson } from '@core/models/person.model';
import { FormGroup, FormArray } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UpdateStateService {
    public enableConfirmation = false;
    public requestFinalStatus: any;

    requestor = new UpdatePerson();

    public hasConsentedToInformationCollection: boolean =
        environment.bypassInformationCollectionNotice;

    /**
     * Contains all form objects for Update as separate entries.
     *
     * Form values are not initialized by default and must be set by component.
     */
    public forms: UpdateFormTypes = {
        // requestorForm: {} as FormGroup,
        // organizationForm: {} as FormGroup,
        // AddRemoveUpdate fields can have objects initialized for convenience so
        // the sub-types can be accessed directly.
        signingAuthority: {} as AddRemoveUpdate,
        mspAccessAdministrators: {} as AddRemoveUpdate,
        mspUsers: {} as AddRemoveUpdate,
        mspGroups: {} as AddRemoveUpdate,
    };

    public formDataStatus: UpdateFormTypes = {
        // requestorForm: {} as FormGroup,
        // organizationForm: {} as FormGroup,
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
    public hasOrganizationUpdates: boolean | null;

    public applicationId: string;

    //#region formStatus for Continue, Summary and Action Button Status

    private formsStatus = new BehaviorSubject<FormStatusUpdate>({
        requestorForm: false,
        organizationForm: false,
        signingAuthority: {
            hasData: false,
            add: false,
            remove: false,
            update: false,
        },
        mspAccessAdministrators: {
            hasData: false,
            add: false,
            remove: false,
            update: false,
        },
        mspUsers: { hasData: false, add: false, remove: false, update: false },
        mspGroups: { hasData: false, add: false, remove: false, update: false },
    });
    formsStatusChanges$ = this.formsStatus.asObservable();

    private getFormStatus(form: AddRemoveUpdate): FormStatusAddRemoveUpdate {
        const formStatus: FormStatusAddRemoveUpdate = {
            hasData: false,
            add: false,
            remove: false,
            update: false,
        };

        const formsRemove = form.remove
            ? (form.remove.get('arrayOfForms') as FormArray | null)
            : null;
        formStatus.remove =
            formsRemove && formsRemove.controls.length > 0 ? true : false;

        const formsAdd = form.add
            ? (form.add.get('arrayOfForms') as FormArray | null)
            : null;
        formStatus.add =
            formsAdd && formsAdd.controls.length > 0 ? true : false;

        const formsEdit = form.update
            ? (form.update.get('arrayOfForms') as FormArray | null)
            : null;
        formStatus.update =
            formsEdit && formsEdit.controls.length > 0 ? true : false;

        formStatus.hasData =
            formStatus.add || formStatus.remove || formStatus.update
                ? true
                : false;

        return formStatus;
    }

    formStatusChanged(): void {
        const formStatus = {
            requestorForm: this.forms.requestorForm ? true : false,
            organizationForm: this.forms.organizationForm ? true : false,
            signingAuthority: this.getFormStatus(this.forms.signingAuthority),
            mspAccessAdministrators: this.getFormStatus(
                this.forms.mspAccessAdministrators
            ),
            mspUsers: this.getFormStatus(this.forms.mspUsers),
            mspGroups: this.getFormStatus(this.forms.mspGroups),
        };
        this.formsStatus.next(formStatus);
    }

    //#endregion
}

export interface UpdateFormTypes {
    requestorForm?: FormGroup;
    organizationForm?: FormGroup;
    signingAuthority?: AddRemoveUpdate;
    mspAccessAdministrators?: AddRemoveUpdate;
    mspUsers?: AddRemoveUpdate;
    mspGroups?: AddRemoveUpdate;
}

export interface AddRemoveUpdate {
    add: FormGroup;
    remove: FormGroup;
    update: FormGroup;
}

export interface FormStatusUpdate {
    requestorForm?: boolean;
    organizationForm?: boolean;
    signingAuthority?: FormStatusAddRemoveUpdate;
    mspAccessAdministrators?: FormStatusAddRemoveUpdate;
    mspUsers?: FormStatusAddRemoveUpdate;
    mspGroups?: FormStatusAddRemoveUpdate;
}

export interface FormStatusAddRemoveUpdate {
    hasData: boolean;
    add: boolean;
    remove: boolean;
    update: boolean;
}
