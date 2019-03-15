import { TestBed } from '@angular/core/testing';

import { MspRegisterDataService } from './msp-register-data.service';
import { organization, coreUser, sa } from '@msp-register/mocks';
import { ISigningAuthorityInformationDef } from '@core/interfaces/i-http-data';

describe('MspRegisterDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service).toBeTruthy();
  });

  it('should return a valid ICoreUser', () => {
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    const user = coreUser;
    const coreUserDef = service.mapBaseUser(user);
    expect(coreUserDef).toBeDefined();
    expect(coreUserDef.sa_last_name).toEqual('Mason');
    // expect(service.mapOrgInformation(org)).toContain('org_name');
  });

  it('should return a valid IOrganizationDef', () => {
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    const org = organization;
    const orgDef = service.mapOrgInformation(org);
    expect(orgDef).toBeDefined();
    expect(orgDef.org_name).toEqual('Kellwood Company');
  });

  it('should return a valid ISigningAuthorityDef', () => {
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    const obj = sa;
    const res = service.mapSigningAuthorityInformationDef(
      obj
    ) as ISigningAuthorityInformationDef[];
    expect(res).toBeDefined();
    expect(res.length).toBe(2);
  });

  it('should return a valid IUserDef', () => {
    const org = organization;
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service).toBeDefined();
    // expect(service.mapOrgInformation(org)).toContain('org_name');
  });

  it('should return a valid IAccessAdministratorPresentDef', () => {
    const org = organization;
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service).toBeDefined();
    // expect(service.mapOrgInformation(org)).toContain('org_name');
  });

  it('should return a valid IMspGroupDef', () => {
    const org = organization;
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service).toBeDefined();
    // expect(service.mapOrgInformation(org)).toContain('org_name');
  });

  it('should return a valid ISiteRegRequest', () => {
    const org = organization;
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service).toBeDefined();
    // expect(service.mapOrgInformation(org)).toContain('org_name');
  });
});
