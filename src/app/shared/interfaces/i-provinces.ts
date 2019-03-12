

export interface IProvinces {
  provinces: IProvince[];
}

export interface IProvince {
  description: string;
  country: CountryCode;
  provCode: ProvinceCode;
}

type CountryCode = 'CAN' | 'USA';

type ProvinceCode = 'AB' |
  'BC' |
  'MB' |
  'NB' |
  'NL' |
  'NS' |
  'ON' |
  'PE' |
  'QC' |
  'SK' |
  'NT' |
  'NU' |
  'YT' |
  'AL' |
  'AK' |
  'AZ' |
  'AR' |
  'CA' |
  'CO' |
  'CT' |
  'DE' |
  'DC' |
  'FL' |
  'GA' |
  'HI' |
  'ID' |
  'IL' |
  'IN' |
  'IA' |
  'KS' |
  'KY' |
  'LA' |
  'ME' |
  'MD' |
  'MA' |
  'MI' |
  'MN' |
  'MS' |
  'MO' |
  'MT' |
  'NE' |
  'NV' |
  'NH' |
  'NJ' |
  'NM' |
  'NY' |
  'NC' |
  'ND' |
  'OH' |
  'OK' |
  'OR' |
  'PA' |
  'RI' |
  'SC' |
  'SD' |
  'TN' |
  'TX' |
  'UT' |
  'VT' |
  'VA' |
  'WA' |
  'WV' |
  'WI' |
  'WY';