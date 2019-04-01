import {
    IUser,
    IMspSigningAuthority,
    IMspUsers,
    IMspGroup,
    IMspOrganization,
} from './interfaces';
import { IMspAccessAdmin } from './interfaces/i-msp-access-admins';

export const sa: IMspSigningAuthority[] = [
    {
        userTitle: 'Mrs.',
        firstName: 'Sally',
        initial: ']',
        lastName: 'Da SilvaSilva',
        jobTitle: 'Occupational Therapist',
        emailAddress: 'laj@zul.bt',
        phone: '(702) 914-2954',
        ext: '2974',
        fax: '(780) 500-2589',
        administeringFor: '',
        directMspAccess: true,
    },
    {
        userTitle: 'Mrs.',
        firstName: 'Sally',
        initial: ']',
        lastName: 'Da SilvaSilva',
        jobTitle: 'Occupational Therapist',
        emailAddress: 'laj@zul.bt',
        phone: '(702) 914-2954',
        ext: '2974',
        fax: '(780) 500-2589',
        administeringFor: 'E',
        directMspAccess: true,
    },
];
export const users: IUser[] = [
    {
        userTitle: 'Miss',
        firstName: 'Lloyd',
        initial: 't',
        lastName: 'Papi',
        jobTitle: 'Underwriter',
        emailAddress: 'ehoafulon@dikduto.gov',
        phone: '(980) 601-2633',
        ext: '8520',
        fax: '(577) 734-8123',
        administeringFor: 'I',
    },
    {
        userTitle: 'Mr.',
        firstName: 'Blake',
        initial: 'H',
        lastName: 'Orsini',
        jobTitle: 'Art Director',
        emailAddress: 'taunuim@ugetu.om',
        phone: '(370) 389-9367',
        ext: '4060',
        fax: '(841) 258-8250',
        administeringFor: 'B',
    },
    {
        userTitle: 'Mrs.',
        firstName: 'Lois',
        initial: 'a',
        lastName: 'Orlandi',
        jobTitle: 'Day Care Instructor',
        emailAddress: 'purnovgig@raaluten.az',
        phone: '(206) 296-6454',
        ext: '9676',
        fax: '(856) 992-9903',
        administeringFor: 'E',
    },
];

export const accessAdmins: IMspAccessAdmin[] = [
    {
        userTitle: 'Dr.',
        firstName: 'Emilie',
        initial: 'O',
        lastName: 'Franke',
        jobTitle: 'Day Care Instructor',
        emailAddress: 'ar@heser.bw',
        phone: '(643) 748-1098',
        ext: '8127',
        fax: '(937) 567-1938',
        administeringFor: 'I',
        directMspAccess: false,
    },

    {
        userTitle: 'Mrs.',
        firstName: 'Dennis',
        initial: 'I',
        lastName: 'Mason',
        jobTitle: 'Computer Ops. Manager',
        emailAddress: 'rato@tupan.bf',
        phone: '(572) 909-9185',
        ext: '750',
        fax: '(965) 998-3504',
        administeringFor: 'B',
        directMspAccess: false,
    },

    {
        userTitle: 'Mrs.',
        firstName: 'Floyd',
        initial: '&',
        lastName: 'Vidal',
        jobTitle: 'City Manager',
        emailAddress: 'bot@jufdih.gq',
        phone: '(853) 316-7444',
        ext: '6770',
        fax: '(973) 287-1441',
        administeringFor: 'E',
        directMspAccess: true,
    },
];
export const groupNumbers: IMspGroup[] = [
    { groupNumber: '1234567', groupName : 'maximus', thirdParty : true },
    { groupNumber: '1234567', groupName : 'google', thirdParty : true },
    {  groupNumber: '1234567', groupName : 'microsoft', thirdParty : true },
    {  groupNumber: '1234567', groupName : 'oracleclear', thirdParty : true  },
];

export const organization: IMspOrganization = {
    name: 'Kellwood Company',
    // organizationNumber: '11246942',  // TBD: opt-out, this is MSP group number
    suite: '1034',
    street: '128',
    streetName: 'Bayt Street',
    addressLine2: '1034 Birik Grove',
    city: 'Bepkelfoj',
    province: 'NS',
    postalCode: 'R2Q 6B0',
    thirdParty: true,
    blueCross: true,
    administeringFor: 'E',
};

export const coreUser: IUser = {
    userTitle: 'Mrs.',
    firstName: 'Dennis',
    initial: 'I',
    lastName: 'Mason',
    jobTitle: 'Computer Ops. Manager',
    emailAddress: 'rato@tupan.bf',
    phone: '(572) 909-9185',
    ext: '750',
    fax: '(965) 998-3504',
    administeringFor: 'I',
};
