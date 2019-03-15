import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {
  IMspOrganization,
  IMspUsers,
  IMspGroupNumbers,
  IMspSigningAuthority,
  IUser
} from '@msp-register/interfaces';
import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import {
  ISiteregRequest,
  IOrgInformationDef,
  IUserDef,
  IMspGroupDef,
  IAccessAdministratorPresentDef,
  ICoreUserDef,
  IContractingOut,
  YesNo,
  ISigningAuthorityInformationDef
} from '@core/interfaces/i-http-data';

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.pronin sapien nunc accuan eget.';
@Injectable({
  providedIn: 'root'
})
export class MspRegisterDataService {
  private agreementNumber$: BehaviorSubject<string> = new BehaviorSubject(
    '8986GG43'
  );
  private signingAuthorityName$: BehaviorSubject<string> = new BehaviorSubject(
    'Sean'
  );
  private agreementText$: BehaviorSubject<string> = new BehaviorSubject(text);
  private signingAuthorityAddress$: BehaviorSubject<
    string
  > = new BehaviorSubject('Here');

  get agreementNumber() {
    return this.agreementNumber$.asObservable();
  }

  get signingAuthorityName() {
    return this.signingAuthorityName$.asObservable();
  }

  get signingAuthorityAddress() {
    return this.signingAuthorityAddress$.asObservable();
  }

  get agreementText() {
    return this.agreementText$.asObservable();
  }

  updateSigningAuthorityName(name: string) {
    this.signingAuthorityName$.next(name);
  }

  updateSigningAuthorityAddress(addr: string) {
    this.signingAuthorityAddress$.next(addr);
  }

  constructor() {}
  validateKeys(obj) {
    for (const key in Object.keys(obj)) {
      if (obj[key] === typeof obj) throw Error('invalid type');
    }
  }
  mapYesNo(bool: boolean): YesNo {
    if (bool) return 'yes';
    return 'no';
  }

  mapContractingOut(
    // tslint:disable-next-line: variable-name
    contracting_third_party: YesNo,
    // tslint:disable-next-line: variable-name
    third_party_org_num?: string
  ): IContractingOut {
    if (!third_party_org_num) return { contracting_third_party };
    return { contracting_third_party, third_party_org_num };
  }

  mapBaseUser(obj: IUser): ICoreUserDef {
    this.validateKeys(obj);
    if (!obj.fax) obj.fax = null;
    if (!obj.ext) obj.ext = null;
    if (!obj.userTitle) obj.userTitle = null;
    return {
      sa_curtesy_title: obj.userTitle as string,
      sa_last_name: obj.lastName as string,
      sa_initial: obj.initial as string,
      sa_job_title: obj.jobTitle as string,
      sa_email: obj.emailAddress as string,
      sa_phone_num: obj.phone as string,
      sa_phone_ext: obj.ext as string,
      sa_fax_num: obj.fax as string
    };
  }

  mapOrgInformation(obj: IMspOrganization): IOrgInformationDef {
    this.validateKeys(obj);
    if (!obj) throw Error('no organizaiton provided');
    // tslint:disable-next-line: variable-name
    const contracting_out = this.mapContractingOut(
      this.mapYesNo(obj.thirdParty as boolean),
      obj.administeringFor as string
    );
    return {
      contracting_out,
      org_name: obj.name as string,
      org_num: obj.administeringFor as string,
      suite_num: obj.address as string,
      street_num: obj.address as string,
      address_2: obj.address as string,
      city: obj.city as string,
      province: obj.province as string,
      postal_code: obj.postalCode as string
    };
  }

  mapUserDef(obj: IMspUsers): IUserDef {}

  mapGroupDef(obj: IMspGroupNumbers): IMspGroupDef {}

  mapSigningAuthorityInformationDef(
    obj: IMspSigningAuthority[] | IMspSigningAuthority
  ): ISigningAuthorityInformationDef | ISigningAuthorityInformationDef[] {
    const arr = [];
    console.log(typeof obj);
    if (Array.isArray(obj)) {
      obj.forEach((itm, i, array) => {
        console.log('index', i);
        this.validateKeys(itm);
        arr.push(this.mapSigningAuthorityInformationDef(itm));
      });
      return arr;
    }
    const user = this.mapBaseUser(obj) as ISigningAuthorityInformationDef;
    user.sa_msp_access = this.mapYesNo(obj.alsoAdmin as boolean);
    user.sa_spg = obj.administeringFor as string;
    return user;
  }

  mapAccessAdministratorDef(
    obj: IMspAccessAdmin
  ): IAccessAdministratorPresentDef {}

  mapSiteRegRequest(org: IMspOrganization, users: IUserDef[]): ISiteregRequest {
    return;
  }
}

/*
export interface IOrgInformationDef {
  org_name: string;
  org_num: string;
  suite_num: string;
  street_num: string;
  address_2: string;
  city: string;
  province: string;
  postal_code: string;
  contracting_out: IContractingOut;
}
*/
