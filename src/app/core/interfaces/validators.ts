//#region Interfaces

// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Welcome {
    id: string;
    schema: string;
    definitions: Definitions;
    title: string;
    type: string;
    properties: WelcomeProperties;
    required: string[];
}

export interface Definitions {
    orgInformationDef: OrgInformationDef;
    signingAuthorityInformationDef: SigningAuthorityInformationDef;
    accessAdministratorPresentDef: AccessAdministratorPresentDef;
    userDef: UserDef;
    mspGroupDef: MspGroupDef;
}

export interface AccessAdministratorPresentDef {
    type: string;
    properties: AccessAdministratorPresentDefProperties;
    required: string[];
}

export interface AccessAdministratorPresentDefProperties {
    aaCurtesyTitle: PuneHedgehog;
    aaLastName: PuneHedgehog;
    aaFirstName: PuneHedgehog;
    aaInitial: PuneHedgehog;
    aaJobTitle: PuneHedgehog;
    aaEmail: PuneHedgehog;
    aaPhoneNum: AaFaxNum;
    aaPhoneEXT: PuneHedgehog;
    aaFaxNum: AaFaxNum;
    aaMspAccess: AaFaxNum;
    aaSpg: AaFaxNum;
    aaLDAPID: AaFaxNum;
}

export interface PuneHedgehog {
    type: Type;
    maxLength: number;
}

export enum Type {
    String = 'string',
}

export interface AaFaxNum {
    type: Type;
    pattern: string;
}

export interface MspGroupDef {
    type: string;
    properties: MspGroupDefProperties;
    required: string[];
}

export interface MspGroupDefProperties {
    mspgroupNum: PuneHedgehog;
    thirdParty: AaFaxNum;
}

export interface OrgInformationDef {
    type: string;
    properties: OrgInformationDefProperties;
    required: string[];
}

export interface OrgInformationDefProperties {
    orgName: PuneHedgehog;
    orgNum: PuneHedgehog;
    suiteNum: PuneHedgehog;
    streetNum: PuneHedgehog;
    streetName: PuneHedgehog;
    address2: PuneHedgehog;
    city: PuneHedgehog;
    province: PuneHedgehog;
    postalCode: AaFaxNum;
    contractingOut: ContractingOut;
    blueCross: AaFaxNum;
    orgSpg: AaFaxNum;
}

export interface ContractingOut {
    type: string;
    properties: ContractingOutProperties;
    required: string[];
}

export interface ContractingOutProperties {
    contractingThirdParty: AaFaxNum;
    thirdPartyOrgNum: PuneHedgehog;
}

export interface SigningAuthorityInformationDef {
    type: string;
    properties: SigningAuthorityInformationDefProperties;
    required: string[];
}

export interface SigningAuthorityInformationDefProperties {
    saCurtesyTitle: PuneHedgehog;
    saLastName: PuneHedgehog;
    saFirstName: PuneHedgehog;
    saInitial: PuneHedgehog;
    saJobTitle: PuneHedgehog;
    saEmail: PuneHedgehog;
    saPhoneNum: AaFaxNum;
    saPhoneEXT: PuneHedgehog;
    saFaxNum: AaFaxNum;
    saMspAccess: AaFaxNum;
    saSpg: AaFaxNum;
    saLDAPID: AaFaxNum;
}

export interface UserDef {
    type: string;
    properties: UserDefProperties;
    required: string[];
}

export interface UserDefProperties {
    userCurtesyTitle: PuneHedgehog;
    userLastName: PuneHedgehog;
    userFirstName: PuneHedgehog;
    userInitial: PuneHedgehog;
    userJobTitle: PuneHedgehog;
    userEmail: PuneHedgehog;
    userPhoneNum: AaFaxNum;
    userPhoneEXT: PuneHedgehog;
    userFaxNum: AaFaxNum;
    userSpg: AaFaxNum;
}

export interface WelcomeProperties {
    orgInformation: Items;
    signingAuthorityInformation: Items;
    accessAdministratorPresent: AccessAdministratorPresent;
    users: AccessAdministratorPresent;
    type: string;
    items: Items;
    default: any[];
}

export interface AccessAdministratorPresent {
    type: string;
    items: Items;
    default: any[];
}

export interface Items {
    ref: string;
}

//#endregion

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
// export namespace Convert {

//#region  Convert (namespace)

export function toWelcome(json: string): Welcome {
    return cast(JSON.parse(json), r('Welcome'));
}

export function welcomeToJson(value: Welcome): string {
    return JSON.stringify(uncast(value, r('Welcome')), null, 2);
}

function invalidValue(typ: any, val: any): never {
    throw Error(
        `Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`
    );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach(
            (p: any) => (map[p.json] = { key: p.js, typ: p.typ })
        );
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach(
            (p: any) => (map[p.js] = { key: p.json, typ: p.typ })
        );
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(valc: any, typc: any, getProps: any): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue('array', val);
        return val.map((el) => transform(el, typ, getProps));
    }

    function transformDate(typ: any, val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue('Date', val);
        }
        return d;
    }

    const typeMap: any = {
        Welcome: o(
            [
                { json: '$id', js: 'id', typ: '' },
                { json: '$schema', js: 'schema', typ: '' },
                {
                    json: 'definitions',
                    js: 'definitions',
                    typ: r('Definitions'),
                },
                { json: 'title', js: 'title', typ: '' },
                { json: 'type', js: 'type', typ: '' },
                {
                    json: 'properties',
                    js: 'properties',
                    typ: r('WelcomeProperties'),
                },
                { json: 'required', js: 'required', typ: a('') },
            ],
            false
        ),
        Definitions: o(
            [
                {
                    json: 'org_information_def',
                    js: 'orgInformationDef',
                    typ: r('OrgInformationDef'),
                },
                {
                    json: 'signing_authority_information_def',
                    js: 'signingAuthorityInformationDef',
                    typ: r('SigningAuthorityInformationDef'),
                },
                {
                    json: 'access_administrator_present_def',
                    js: 'accessAdministratorPresentDef',
                    typ: r('AccessAdministratorPresentDef'),
                },
                { json: 'user_def', js: 'userDef', typ: r('UserDef') },
                {
                    json: 'msp_group_def',
                    js: 'mspGroupDef',
                    typ: r('MspGroupDef'),
                },
            ],
            false
        ),
        AccessAdministratorPresentDef: o(
            [
                { json: 'type', js: 'type', typ: '' },
                {
                    json: 'properties',
                    js: 'properties',
                    typ: r('AccessAdministratorPresentDefProperties'),
                },
                { json: 'required', js: 'required', typ: a('') },
            ],
            false
        ),
        AccessAdministratorPresentDefProperties: o(
            [
                {
                    json: 'aa_curtesy_title',
                    js: 'aaCurtesyTitle',
                    typ: r('PuneHedgehog'),
                },
                {
                    json: 'aa_last_name',
                    js: 'aaLastName',
                    typ: r('PuneHedgehog'),
                },
                {
                    json: 'aa_first_name',
                    js: 'aaFirstName',
                    typ: r('PuneHedgehog'),
                },
                { json: 'aa_initial', js: 'aaInitial', typ: r('PuneHedgehog') },
                {
                    json: 'aa_job_title',
                    js: 'aaJobTitle',
                    typ: r('PuneHedgehog'),
                },
                { json: 'aa_email', js: 'aaEmail', typ: r('PuneHedgehog') },
                { json: 'aa_phone_num', js: 'aaPhoneNum', typ: r('AaFaxNum') },
                {
                    json: 'aa_phone_ext',
                    js: 'aaPhoneEXT',
                    typ: r('PuneHedgehog'),
                },
                { json: 'aa_fax_num', js: 'aaFaxNum', typ: r('AaFaxNum') },
                {
                    json: 'aa_msp_access',
                    js: 'aaMspAccess',
                    typ: r('AaFaxNum'),
                },
                { json: 'aa_spg', js: 'aaSpg', typ: r('AaFaxNum') },
                { json: 'aa_ldap_id', js: 'aaLDAPID', typ: r('AaFaxNum') },
            ],
            false
        ),
        PuneHedgehog: o(
            [
                { json: 'type', js: 'type', typ: r('Type') },
                { json: 'maxLength', js: 'maxLength', typ: 0 },
            ],
            false
        ),
        AaFaxNum: o(
            [
                { json: 'type', js: 'type', typ: r('Type') },
                { json: 'pattern', js: 'pattern', typ: '' },
            ],
            false
        ),
        MspGroupDef: o(
            [
                { json: 'type', js: 'type', typ: '' },
                {
                    json: 'properties',
                    js: 'properties',
                    typ: r('MspGroupDefProperties'),
                },
                { json: 'required', js: 'required', typ: a('') },
            ],
            false
        ),
        MspGroupDefProperties: o(
            [
                {
                    json: 'mspgroup_num',
                    js: 'mspgroupNum',
                    typ: r('PuneHedgehog'),
                },
                { json: 'third_party', js: 'thirdParty', typ: r('AaFaxNum') },
            ],
            false
        ),
        OrgInformationDef: o(
            [
                { json: 'type', js: 'type', typ: '' },
                {
                    json: 'properties',
                    js: 'properties',
                    typ: r('OrgInformationDefProperties'),
                },
                { json: 'required', js: 'required', typ: a('') },
            ],
            false
        ),
        OrgInformationDefProperties: o(
            [
                { json: 'org_name', js: 'orgName', typ: r('PuneHedgehog') },
                { json: 'org_num', js: 'orgNum', typ: r('PuneHedgehog') },
                { json: 'suite_num', js: 'suiteNum', typ: r('PuneHedgehog') },
                { json: 'street_num', js: 'streetNum', typ: r('PuneHedgehog') },
                {
                    json: 'street_name',
                    js: 'streetName',
                    typ: r('PuneHedgehog'),
                },
                { json: 'address_2', js: 'address2', typ: r('PuneHedgehog') },
                { json: 'city', js: 'city', typ: r('PuneHedgehog') },
                { json: 'province', js: 'province', typ: r('PuneHedgehog') },
                { json: 'postal_code', js: 'postalCode', typ: r('AaFaxNum') },
                {
                    json: 'contracting_out',
                    js: 'contractingOut',
                    typ: r('ContractingOut'),
                },
                { json: 'blue_cross', js: 'blueCross', typ: r('AaFaxNum') },
                { json: 'org_spg', js: 'orgSpg', typ: r('AaFaxNum') },
            ],
            false
        ),
        ContractingOut: o(
            [
                { json: 'type', js: 'type', typ: '' },
                {
                    json: 'properties',
                    js: 'properties',
                    typ: r('ContractingOutProperties'),
                },
                { json: 'required', js: 'required', typ: a('') },
            ],
            false
        ),
        ContractingOutProperties: o(
            [
                {
                    json: 'contracting_third_party',
                    js: 'contractingThirdParty',
                    typ: r('AaFaxNum'),
                },
                {
                    json: 'third_party_org_num',
                    js: 'thirdPartyOrgNum',
                    typ: r('PuneHedgehog'),
                },
            ],
            false
        ),
        SigningAuthorityInformationDef: o(
            [
                { json: 'type', js: 'type', typ: '' },
                {
                    json: 'properties',
                    js: 'properties',
                    typ: r('SigningAuthorityInformationDefProperties'),
                },
                { json: 'required', js: 'required', typ: a('') },
            ],
            false
        ),
        SigningAuthorityInformationDefProperties: o(
            [
                {
                    json: 'sa_curtesy_title',
                    js: 'saCurtesyTitle',
                    typ: r('PuneHedgehog'),
                },
                {
                    json: 'sa_last_name',
                    js: 'saLastName',
                    typ: r('PuneHedgehog'),
                },
                {
                    json: 'sa_first_name',
                    js: 'saFirstName',
                    typ: r('PuneHedgehog'),
                },
                { json: 'sa_initial', js: 'saInitial', typ: r('PuneHedgehog') },
                {
                    json: 'sa_job_title',
                    js: 'saJobTitle',
                    typ: r('PuneHedgehog'),
                },
                { json: 'sa_email', js: 'saEmail', typ: r('PuneHedgehog') },
                { json: 'sa_phone_num', js: 'saPhoneNum', typ: r('AaFaxNum') },
                {
                    json: 'sa_phone_ext',
                    js: 'saPhoneEXT',
                    typ: r('PuneHedgehog'),
                },
                { json: 'sa_fax_num', js: 'saFaxNum', typ: r('AaFaxNum') },
                {
                    json: 'sa_msp_access',
                    js: 'saMspAccess',
                    typ: r('AaFaxNum'),
                },
                { json: 'sa_spg', js: 'saSpg', typ: r('AaFaxNum') },
                { json: 'sa_ldap_id', js: 'saLDAPID', typ: r('AaFaxNum') },
            ],
            false
        ),
        UserDef: o(
            [
                { json: 'type', js: 'type', typ: '' },
                {
                    json: 'properties',
                    js: 'properties',
                    typ: r('UserDefProperties'),
                },
                { json: 'required', js: 'required', typ: a('') },
            ],
            false
        ),
        UserDefProperties: o(
            [
                {
                    json: 'user_curtesy_title',
                    js: 'userCurtesyTitle',
                    typ: r('PuneHedgehog'),
                },
                {
                    json: 'user_last_name',
                    js: 'userLastName',
                    typ: r('PuneHedgehog'),
                },
                {
                    json: 'user_first_name',
                    js: 'userFirstName',
                    typ: r('PuneHedgehog'),
                },
                {
                    json: 'user_initial',
                    js: 'userInitial',
                    typ: r('PuneHedgehog'),
                },
                {
                    json: 'user_job_title',
                    js: 'userJobTitle',
                    typ: r('PuneHedgehog'),
                },
                { json: 'user_email', js: 'userEmail', typ: r('PuneHedgehog') },
                {
                    json: 'user_phone_num',
                    js: 'userPhoneNum',
                    typ: r('AaFaxNum'),
                },
                {
                    json: 'user_phone_ext',
                    js: 'userPhoneEXT',
                    typ: r('PuneHedgehog'),
                },
                { json: 'user_fax_num', js: 'userFaxNum', typ: r('AaFaxNum') },
                { json: 'user_spg', js: 'userSpg', typ: r('AaFaxNum') },
            ],
            false
        ),
        WelcomeProperties: o(
            [
                {
                    json: 'org_information',
                    js: 'orgInformation',
                    typ: r('Items'),
                },
                {
                    json: 'signing_authority_information',
                    js: 'signingAuthorityInformation',
                    typ: r('Items'),
                },
                {
                    json: 'access_administrator_present',
                    js: 'accessAdministratorPresent',
                    typ: r('AccessAdministratorPresent'),
                },
                {
                    json: 'users',
                    js: 'users',
                    typ: r('AccessAdministratorPresent'),
                },
                { json: 'type', js: 'type', typ: '' },
                { json: 'items', js: 'items', typ: r('Items') },
                { json: 'default', js: 'default', typ: a('any') },
            ],
            false
        ),
        AccessAdministratorPresent: o(
            [
                { json: 'type', js: 'type', typ: '' },
                { json: 'items', js: 'items', typ: r('Items') },
                { json: 'default', js: 'default', typ: a('any') },
            ],
            false
        ),
        Items: o([{ json: '$ref', js: 'ref', typ: '' }], false),
        Type: ['string'],
    };

    function transformObject(
        props: { [k: string]: any },
        additional: any,
        val: any
    ): any {
        if (val === null || typeof val !== 'object' || Array.isArray(val)) {
            return invalidValue('object', val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach((key) => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key)
                ? val[key]
                : undefined;
            result[prop.key] = transform(v, prop.typ, getProps);
        });
        Object.getOwnPropertyNames(val).forEach((key) => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps);
            }
        });
        return result;
    }

    if (typc === 'any') return valc;
    if (typc === null) {
        if (valc === null) return valc;
        return invalidValue(typc, valc);
    }
    if (typc === false) return invalidValue(typc, valc);
    while (typeof typc === 'object' && typc.ref !== undefined) {
        typc = typeMap[typc.ref];
    }
    if (Array.isArray(typc)) return transformEnum(typc, valc);
    if (typeof typc === 'object') {
        return typc.hasOwnProperty('unionMembers')
            ? transformUnion(typc.unionMembers, valc)
            : typc.hasOwnProperty('arrayItems')
            ? transformArray(typc.arrayItems, valc)
            : typc.hasOwnProperty('props')
            ? transformObject(getProps(typc), typc.additional, valc)
            : invalidValue(typc, valc);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typc === Date && typeof valc !== 'number') {
        return transformDate(typc, valc);
    }
    return transformPrimitive(typc, valc);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}
// }
//#endregion
