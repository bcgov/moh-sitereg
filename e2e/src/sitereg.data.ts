import * as faker from 'faker';

export class FakeDataSiteReg {

    organizationInfo(): OrganizationPageTest {
        return {
            orgName: faker.company.companyName(),
            suiteNo: faker.random.number(100),
            // suiteNo: Math.random() > 0.5 ? faker.random.number(3) : undefined,
            streetNo: faker.random.number(100),
            streetName: faker.address.streetName(),
            streetAddressLine: faker.address.streetAddress(),
            // streetAddressLine: Math.random() > 0.5 ? faker.address.streetAddress() : undefined,
            city: faker.address.city(),
            postal: faker.address.zipCode('?#?#?#'),
            orgNum: faker.random.number({
                min: 10000000,
                max: 99999999
            })
        };
    }

    signingAuthorityInfo(): SigningAuthorityPageTest {
        return {
            firstName: faker.name.firstName(),
            // initial: faker.name.prefix(),
            lastName: faker.name.lastName(),
            jobTitle: faker.name.jobTitle(),
            email: faker.internet.email(),
            mobile: faker.phone.phoneNumberFormat(2),
            extension: faker.random.number(3),
            fax: faker.phone.phoneNumberFormat(2)
        };
    }

    setSeed(number) {
         faker.seed(number);
    }
}

export interface OrganizationPageTest {
  orgName: string;
  suiteNo: number;
  streetNo: number;
  streetName: string;
  streetAddressLine: string;
  city: string;
  postal: string;
  orgNum: number;
}

export interface SigningAuthorityPageTest {
    firstName: string;
    // initial: string;
    lastName: string;
    jobTitle: string;
    email: string;
    mobile: string;
    extension: number;
    fax: string;
}

