import { TestBed } from '@angular/core/testing';

import { MspRegisterDataService } from './msp-register-data.service';
import { organization } from '@msp-register/mocks';

describe('MspRegisterDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service).toBeTruthy();
  });

  it('should return a valid IOrganizationDef', () => {
    const org = organization;
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service.mapOrgInformation(org)).toBeDefined();
    // expect(service.mapOrgInformation(org)).toContain('org_name');
  });

  it('should return a valid ISigningAuthorityDef', () => {
    const org = organization;
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service.mapOrgInformation(org)).toBeDefined();
    // expect(service.mapOrgInformation(org)).toContain('org_name');
  });

  it('should return a valid IUserDef', () => {
    const org = organization;
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service.mapOrgInformation(org)).toBeDefined();
    // expect(service.mapOrgInformation(org)).toContain('org_name');
  });

  it('should return a valid IAccessAdministratorPresentDef', () => {
    const org = organization;
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service.mapOrgInformation(org)).toBeDefined();
    // expect(service.mapOrgInformation(org)).toContain('org_name');
  });

  it('should return a valid IMspGroupDef', () => {
    const org = organization;
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service.mapOrgInformation(org)).toBeDefined();
    // expect(service.mapOrgInformation(org)).toContain('org_name');
  });

  it('should return a valid ISiteRegRequest', () => {
    const org = organization;
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service.mapOrgInformation(org)).toBeDefined();
    // expect(service.mapOrgInformation(org)).toContain('org_name');
  });
});
