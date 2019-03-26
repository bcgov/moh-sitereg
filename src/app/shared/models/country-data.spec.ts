import { CountryData } from './country-data';

describe('CountryData', () => {
    it('should create an instance', () => {
        expect(new CountryData()).toBeTruthy();
    });
    it('should return a country', () => {
        const countryData = new CountryData();
        expect(countryData.provinces).toBeDefined();
        expect(countryData.provinces.length).toBeGreaterThan(0);
    });
});
