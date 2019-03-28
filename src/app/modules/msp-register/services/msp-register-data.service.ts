import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import {
    IMspOrganization,
    IMspUsers,
    IMspGroupNumbers,
    IMspSigningAuthority,
    IUser,
} from '@msp-register/interfaces';
import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import {
    ISiteregRequest,
    IOrgInformationDef,
    IUserDef,
    IMspGroupDef,
    IAccessAdministratorDef,
    ICoreUserDef,
    IContractingOut,
    YesNo,
    ISigningAuthorityDef,
} from '@core/interfaces/i-http-data';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

/* tslint:disable */
const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.pronin sapien nunc accuan eget.';
/* tslint:enable */

@Injectable({
    providedIn: 'root',
})
export class MspRegisterDataService {
    private agreementNumber$: BehaviorSubject<string> = new BehaviorSubject(
        '8986GG43'
    );
    private signingAuthorityName$: BehaviorSubject<
        string
    > = new BehaviorSubject('Sean');
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

    constructor(private http: HttpClient) {}
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
            sa_first_name: obj.firstName as string,
            sa_initial: obj.initial as string,
            sa_job_title: obj.jobTitle as string,
            sa_email: obj.emailAddress as string,
            sa_phone_num: obj.phone as string,
            sa_phone_ext: obj.ext as string,
            sa_fax_num: obj.fax as string,
        };
    }

    //#region Common Defination Mappsing

    /**
     * Maps boolean value to middleware defination ^[YN]$
     * @param val Boolean Parameter
     */
    mapYesNoDef(val: boolean): string {
        if (val) return 'Y';
        return 'N';
    }

    /**
     * Maps Administring for selected value to middleware defination ^[EIB]$
     * @param val string Parameter
     */
    mapAdministeringForDef(val: string): string {
        let result = '';
        switch (val) {
            case 'Employees': {
                result = 'E';
                break;
            }
            case 'International Students': {
                result = 'I';
                break;
            }
            case 'Employees and International Students': {
                result = 'B';
                break;
            }
        }
        console.log(
            'mapDefAdministeringFor- selected=',
            val,
            ' translatedForDef=',
            result
        );
        return result;
    }

    //#endregion

    //#region Orgnaization

    mapOrgInformation(obj: IMspOrganization): IOrgInformationDef {
        this.validateKeys(obj);
        if (!obj) throw Error('no organizaiton provided');
        // tslint:disable-next-line: variable-name
        const contracting_out = this.mapContractingOut(
            this.mapYesNo(obj.thirdParty as boolean),
            '' // obj.organizationNumber as string  // TBD: opt-out, this is MSP group number
        );
        return {
            contracting_out,
            org_name: obj.name as string,
            org_num: '', // obj.organizationNumber as string, // TBD: opt-out, this is MSP group number
            suite_num: obj.suite as string,
            street_num: obj.street as string,
            street_name: obj.streetName as string,
            address_2: obj.addressLine2 as string,
            city: obj.city as string,
            province: obj.province as string,
            postal_code: obj.postalCode as string,
            blue_cross: this.mapYesNoDef(obj.blueCross as boolean),
            org_spg: this.mapAdministeringForDef(
                obj.administeringFor as string
            ),
        };
    }

    //#endregion

    //#region Singing Authority

    mapSigningAuthorityInformationDef(
        obj: IMspSigningAuthority[] | IMspSigningAuthority
    ): ISigningAuthorityDef | ISigningAuthorityDef[] {
        if (Array.isArray(obj)) {
            // actual UI has not array for singing authority users, array seems unnecessary
            console.log('ARRAY mapSigningAuthorityInformationDef');
            const arr = [];
            obj.forEach((itm) => {
                this.validateKeys(itm);
                arr.push(this.mapSigningAuthorityInformationDef(itm));
            });
            return arr;
        }
        const user = this.mapBaseUser(obj) as ISigningAuthorityDef;
        user.sa_msp_access = this.mapYesNoDef(obj.directAccess as boolean);
        user.sa_spg = this.mapAdministeringForDef(
            obj.administeringFor as string
        );
        return user as ISigningAuthorityDef;
    }

    //#endregion

    mapUserDef(obj: IUser | IUser[]): IUserDef | IUserDef[] {
        if (Array.isArray(obj)) {
            const arr = [];
            obj.forEach((itm) => {
                this.validateKeys(itm);
                arr.push(this.mapUserDef(itm));
            });
            return arr;
        }
        const user = this.mapBaseUser(obj) as IUserDef;
        user.user_spg = obj.administeringFor as string;
        return user;
    }

    /*
  SH: not sure if this is required atm.
*/
    // mapGroupDef(obj: IMspGroupNumbers): IMspGroupDef {
    //   if (Array.isArray(obj)) {
    //     return obj.map(itm => {})
    //   }
    // }

    //#region Singing Authority

    mapAccessAdministratorDef(
        obj: IMspAccessAdmin | IMspAccessAdmin[]
    ): IAccessAdministratorDef | IAccessAdministratorDef[] {
        if (Array.isArray(obj)) {
            const arr = [];
            obj.forEach((itm) => {
                this.validateKeys(obj);
                arr.push(this.mapAccessAdministratorDef(itm));
            });
            return arr;
        }
        const user = this.mapBaseUser(obj) as IAccessAdministratorDef;
        user.aa_msp_access = this.mapYesNoDef(obj.directAccess as boolean);
        user.aa_spg = this.mapAdministeringForDef(
            obj.administeringFor as string
        );
        return user as IAccessAdministratorDef;
    }

    //#endregion

    mapSiteRegRequest(
        // tslint:disable-next-line: variable-name
        org_information: IOrgInformationDef,
        // tslint:disable-next-line: variable-name
        signing_authority: ISigningAuthorityDef,
        // tslint:disable-next-line: variable-name
        access_administrator_present: IAccessAdministratorDef[],
        users: IUserDef[]
    ): ISiteregRequest {
        return {
            org_information,
            signing_authority,
            access_administrator_present,
            users,
            msp_group: org_information.contracting_out as any,
        };
    }

    createSiteregRequest(obj: ISiteregRequest) {
        return this.http.put(`${apiUrl}/sitereg`, obj).toPromise();
    }
}
