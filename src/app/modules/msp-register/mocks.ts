import {
  IUser,
  IMspSigningAuthority,
  IMspUsers,
  IMspGroupNumbers,
  IMspOrganization
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
    alsoAdmin: true,
    directAccess: true
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
    administeringFor: '',
    alsoAdmin: true,
    directAccess: true
  }
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
    administeringFor: ''
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
    administeringFor: ''
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
    administeringFor: ''
  }
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
    administeringFor: '',
    directAccess: false
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
    administeringFor: '',
    directAccess: false
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
    administeringFor: '',
    directAccess: true
  }
];
export const groupNumbers: IMspGroupNumbers[] = [
  { groupNumber: 'atasipe' },
  { groupNumber: 'hamillo' },
  { groupNumber: 'vohadwu' },
  { groupNumber: 'kubfiwu' }
];

export const organization: IMspOrganization = {
  name: 'Kellwood Company',
  address: '1034 Birik Grove',
  city: 'Bepkelfoj',
  province: 'NS',
  postalCode: 'R2Q 6B0',
  thirdParty: true,
  blueCross: true,
  administeringFor: 'yes'
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
  administeringFor: ''
};