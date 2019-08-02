import * as faker from 'faker';
import * as fs from 'fs';

export class FakeDataDevUpdate {

    private static seedVal: number = Math.floor(Math.random() * Math.floor(1000));
    public hasJsonData: boolean = false;

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
            anyUpdates: true,
            orgName: faker.company.companyName(),
            suiteNo: Math.random() > 0.5 ? faker.random.number(3) : undefined,
            streetNo: faker.random.number(100),
            streetName: faker.address.streetName(),
            streetAddressLine: Math.random() > 0.5 ? faker.address.streetAddress() : undefined,
            city: faker.address.city(),
            province: 'British Columbia',
            postal: faker.address.zipCode('A1A1A1'),
            administeringFor: 'Employees'
        };
    }

    signingAuthorityInfo(): SigningAuthorityPageTest {
        return {
            title: 'Prof.',
            firstName: faker.name.firstName(),
            initial: 'S',
            lastName: faker.name.lastName(),
            jobTitle: faker.name.jobTitle(),
            email: 'user@example.com',
            confirmEmail: 'user@example.com',
            mobile: faker.random.number({
                min: 1000000000,
                max: 9999999999
            }),
            extension: faker.random.number(3),
            fax: faker.random.number({
                min: 1000000000,
                max: 9999999999
            }),
            accessToMSP: true,
            administeringFor: 'Employees'
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

    getJSONData() {
        const x = process.argv;
        const input = process.argv.filter(x => x.startsWith('--data'));
        // console.log('INPUT: ', input.toString());
        if (input.toString() !== '') {
            const filename = input.toString().split('=')[1];
            const data = fs.readFileSync(filename, 'utf8');
            const jsonData = JSON.parse(data);
            this.hasJsonData = true;
            return jsonData;
        } else {
            return null;
        }
    }
}

export interface RequestorPageTest {
    orgNum: number;
    email: string;
}

export interface OrganizationPageTest {
    anyUpdates: boolean;
    orgName: string;
    suiteNo: number;
    streetNo: number;
    streetName: string;
    streetAddressLine: string;
    city: string;
    province: string;
    postal: string;
    administeringFor: string;
}

export interface SigningAuthorityPageTest {
    title: string;
    firstName: string;
    initial: string;
    lastName: string;
    jobTitle: string;
    email: string;
    confirmEmail: string;
    mobile: number;
    extension: number;
    fax: number;
    accessToMSP: boolean;
    administeringFor: string;
}

export interface GroupNumbersPageTest {
    groupNum: number;
}

