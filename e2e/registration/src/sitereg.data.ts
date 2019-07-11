import * as faker from 'faker';
import * as fs from 'fs';


export class FakeDataSiteReg {

    private static seedVal: number = Math.floor(Math.random() * Math.floor(1000));
    public hasJsonData: boolean = false;

    organizationInfo(): OrganizationPageTest {
        return {
            orgName: faker.company.companyName(),
            suiteNo: Math.random() > 0.5 ? faker.random.number(3) : undefined,
            streetNo: faker.random.number(100),
            streetName: faker.address.streetName(),
            streetAddressLine: Math.random() > 0.5 ? faker.address.streetAddress() : undefined,
            city: faker.address.city(),
            postal: faker.address.zipCode('A1A1A1'),
            orgNum: faker.random.number({
                min: 10000000,
                max: 99999999
            })
        };
    }

    signingAuthorityInfo(): SigningAuthorityPageTest {
        return {
            title: 'Mr.',
            firstName: faker.name.firstName(),
            initial: 'S',
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

    organizationMax(): OrganizationPageTest {
        return {
            orgName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labores',
            suiteNo: 1234567890,
            streetNo: 1234567890,
            streetName: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem',
// tslint:disable-next-line: max-line-length
            streetAddressLine: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboresLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labores',
            city: 'Lorem ipsum dolor sit ame',
            postal: 'A1A1A1',
            orgNum: 99999999
        };
    }

    getSeed() {
        return FakeDataSiteReg.seedVal;
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

    getUUID() {

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
    title: string;
    firstName: string;
    initial: string;
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

