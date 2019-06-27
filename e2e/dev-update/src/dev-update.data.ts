import * as faker from 'faker';

export class FakeDataDevUpdate {

    private static seedVal: number = Math.floor(Math.random() * Math.floor(1000));

    requestorInfo(): RequestorPageTest {
        return {
            orgNum: faker.random.number({
                min: 10000000,
                max: 99999999
            }),
            email: faker.internet.email()
        };
    }

    organizationInfo(): OrganizationPageTest {
        return {
            orgName: faker.company.companyName(),
            suiteNo: Math.random() > 0.5 ? faker.random.number(3) : undefined,
            streetNo: faker.random.number(100),
            streetName: faker.address.streetName(),
            streetAddressLine: Math.random() > 0.5 ? faker.address.streetAddress() : undefined,
            city: faker.address.city(),
            postal: faker.address.zipCode('A1A1A1')
        };
    }

    signingAuthorityInfo(): SigningAuthorityPageTest {
        return {
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            jobTitle: faker.name.jobTitle(),
            email: faker.internet.email(),
            mobile: faker.random.number({
                min: 1000000000,
                max: 9999999999
            }),
            extension: faker.random.number(3),
            fax: faker.random.number({
                min: 1000000000,
                max: 9999999999
            }),
        };
    }

    groupNumbersInfo(): GroupNumbersPageTest {
        return {
            groupNum: faker.random.number({
                min: 1000000,
                max: 9999999
            })
        };
    }

    getSeed() {
        return FakeDataDevUpdate.seedVal;
    }

    setSeed(seed = this.getSeed()) {
        faker.seed(seed);
    }
}

export interface RequestorPageTest {
    orgNum: number;
    email: string;
}

export interface OrganizationPageTest {
  orgName: string;
  suiteNo: number;
  streetNo: number;
  streetName: string;
  streetAddressLine: string;
  city: string;
  postal: string;
}

export interface SigningAuthorityPageTest {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    mobile: number;
    extension: number;
    fax: number;
}

export interface GroupNumbersPageTest {
    groupNum: number;
}

