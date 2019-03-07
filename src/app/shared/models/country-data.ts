import { IProvinces, IProvince } from '@shared/interfaces/i-provinces';

const provincesData = [
  { country: 'CAN', provCode: 'AB', description: 'Alberta' },
  { country: 'CAN', provCode: 'BC', description: 'British Columbia' },
  { country: 'CAN', provCode: 'MB', description: 'Manitoba' },
  { country: 'CAN', provCode: 'NB', description: 'New Brunswick' },
  { country: 'CAN', provCode: 'NL', description: 'Newfoundland and Labrador' },
  { country: 'CAN', provCode: 'NS', description: 'Nova Scotia' },
  { country: 'CAN', provCode: 'ON', description: 'Ontario' },
  { country: 'CAN', provCode: 'PE', description: 'Prince Edward Island' },
  { country: 'CAN', provCode: 'QC', description: 'Quebec' },
  { country: 'CAN', provCode: 'SK', description: 'Saskatchewan' },
  { country: 'CAN', provCode: 'NT', description: 'Northwest Territories' },
  { country: 'CAN', provCode: 'NU', description: 'Nunavut' },
  { country: 'CAN', provCode: 'YT', description: 'Yukon' },
  { country: 'USA', provCode: 'AL', description: 'Alabama' },
  { country: 'USA', provCode: 'AK', description: 'Alaska' },
  { country: 'USA', provCode: 'AZ', description: 'Arizona' },
  { country: 'USA', provCode: 'AR', description: 'Arkansas' },
  { country: 'USA', provCode: 'CA', description: 'California' },
  { country: 'USA', provCode: 'CO', description: 'Colorado' },
  { country: 'USA', provCode: 'CT', description: 'Connecticut' },
  { country: 'USA', provCode: 'DE', description: 'Delaware' },
  { country: 'USA', provCode: 'DC', description: 'District Of Columbia' },
  { country: 'USA', provCode: 'FL', description: 'Florida' },
  { country: 'USA', provCode: 'GA', description: 'Georgia' },
  { country: 'USA', provCode: 'HI', description: 'Hawaii' },
  { country: 'USA', provCode: 'ID', description: 'Idaho' },
  { country: 'USA', provCode: 'IL', description: 'Illinois' },
  { country: 'USA', provCode: 'IN', description: 'Indiana' },
  { country: 'USA', provCode: 'IA', description: 'Iowa' },
  { country: 'USA', provCode: 'KS', description: 'Kansas' },
  { country: 'USA', provCode: 'KY', description: 'Kentucky' },
  { country: 'USA', provCode: 'LA', description: 'Louisiana' },
  { country: 'USA', provCode: 'ME', description: 'Maine' },
  { country: 'USA', provCode: 'MD', description: 'Maryland' },
  { country: 'USA', provCode: 'MA', description: 'Massachusetts' },
  { country: 'USA', provCode: 'MI', description: 'Michigan' },
  { country: 'USA', provCode: 'MN', description: 'Minnesota' },
  { country: 'USA', provCode: 'MS', description: 'Mississippi' },
  { country: 'USA', provCode: 'MO', description: 'Missouri' },
  { country: 'USA', provCode: 'MT', description: 'Montana' },
  { country: 'USA', provCode: 'NE', description: 'Nebraska' },
  { country: 'USA', provCode: 'NV', description: 'Nevada' },
  { country: 'USA', provCode: 'NH', description: 'New Hampshire' },
  { country: 'USA', provCode: 'NJ', description: 'New Jersey' },
  { country: 'USA', provCode: 'NM', description: 'New Mexico' },
  { country: 'USA', provCode: 'NY', description: 'New York' },
  { country: 'USA', provCode: 'NC', description: 'North Carolina' },
  { country: 'USA', provCode: 'ND', description: 'North Dakota' },
  { country: 'USA', provCode: 'OH', description: 'Ohio' },
  { country: 'USA', provCode: 'OK', description: 'Oklahoma' },
  { country: 'USA', provCode: 'OR', description: 'Oregon' },
  { country: 'USA', provCode: 'PA', description: 'Pennsylvania' },
  { country: 'USA', provCode: 'RI', description: 'Rhode Island' },
  { country: 'USA', provCode: 'SC', description: 'South Carolina' },
  { country: 'USA', provCode: 'SD', description: 'South Dakota' },
  { country: 'USA', provCode: 'TN', description: 'Tennessee' },
  { country: 'USA', provCode: 'TX', description: 'Texas' },
  { country: 'USA', provCode: 'UT', description: 'Utah' },
  { country: 'USA', provCode: 'VT', description: 'Vermont' },
  { country: 'USA', provCode: 'VA', description: 'Virginia' },
  { country: 'USA', provCode: 'WA', description: 'Washington' },
  { country: 'USA', provCode: 'WV', description: 'West Virginia' },
  { country: 'USA', provCode: 'WI', description: 'Wisconsin' },
  { country: 'USA', provCode: 'WY', description: 'Wyoming' }
];

export class CountryData implements IProvinces {
  provinces: IProvince[] = [];

  constructor() {
    this.provinces = provincesData as any;
  }

}

