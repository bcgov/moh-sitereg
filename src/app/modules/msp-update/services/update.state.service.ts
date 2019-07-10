import { Injectable } from '@angular/core';
import { UpdatePerson } from '@core/models/person.model';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { format } from 'path';
import { funcRandomNumber8Digit, getDateinMMDDYYYY, mapAdministeringForDef } from '../common/update-validators';

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
  public hasOrganizationUpdates: boolean | null;

  public applicationId: string;

  //#region MapToJSON

  getJsonRequestorInfo(formValues) {
    if (formValues) return '';

    // generate signing-authorityistrator-remove object
    const json: any = {};
    // from form
    json.org_num = formValues && formValues.organizationNumber ? formValues.organizationNumber : '';
    json.org_email = formValues && formValues.emailAddress ? formValues.emailAddress : '';

    json.request_uuid = this.applicationId;
    json.request_num = funcRandomNumber8Digit();
    json.authorizedBySA = 'Y';
    const dated = new Date();
    json.authorizedDate = getDateinMMDDYYYY(dated);
    json.applicationType = 'mspdUpdate';
    // if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
    return json;
  }

  
  getJsonOrganization(formValues) {
    if (formValues) return '';
    const json: any = {};
    json.org_name = formValues.organizationName ? formValues.organizationName : '';
    // suite no not in schema
    // json.suite = formValues.suite ? formValues.suite : '';
    // street no not in schema
    // json.street = formValues.street ? formValues.street : '';
    // is street_address is street name
    json.street_address = formValues.streetName ? formValues.streetName : '';
    json.address_2 = formValues.addressLine2 ? formValues.addressLine2 : '';
    json.city = formValues.city ? formValues.city : '';
    json.province = formValues.province ? formValues.province : '';
    json.postalCode = formValues.postalCode ? formValues.postalCode : '';
    json.org_spg = mapAdministeringForDef(formValues.administeringFor);
    // if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
    return json;
  }

  // getJsonOrganization(formValues): string {
  //   if (formValues) return '';

  //   // generate signing-authorityistrator-remove object
  //   const json: any = {};
    
  //   // "org_name": { "type": "string", "maxLength": 100 },
	// 	// "street_address": { "type": "string", "maxLength": 200 },
	// 	// "address_2": { "type": "string", "maxLength": 200 },
	// 	// "city": { "type": "string", "maxLength": 25 },
	// 	// "province": { "type": "string", "maxLength": 3 },
	// 	// "postal_code": { "type": "string", "pattern": "^[ABCEGHJ-NPRSTVXY][0-9][ABCEGHJ-NPRSTV-Z][0-9][ABCEGHJ-NPRSTV-Z][0-9]$" },
	// 	// "org_spg": { "type": "string", "pattern": "^[NEIB]$" }
	  
  //   json.org_name = formValues && formValues.organizationNumber ? formValues.organizationNumber : '';
  //   json.street_address = formValues && formValues.emailAddress ? formValues.emailAddress : '';

  //   json.address_2 = this.applicationId;
  //   json.city = funcRandomNumber8Digit();
  //   json.province = 'Y';
  //   json.postal_code = getDateinMMDDYYYY(dated);
  //   json.org_spg = 'mspdUpdate';
  //   // if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
  //   return json;
  // }


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
