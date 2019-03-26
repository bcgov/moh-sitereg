import { TestBed } from "@angular/core/testing";

import { MspRegisterStateService } from "./msp-register-state.service";

describe("MspRegisterStateService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: MspRegisterStateService = TestBed.get(
      MspRegisterStateService
    );
    expect(service).toBeTruthy();
  });
});
