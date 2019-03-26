import { MspRegisterPerson } from "./msp-register-person";
import { GenerateForm } from "./generate-form";
import { FormBuilder, FormControl } from "@angular/forms";
import { ValidatorHelpers, postalCodeValidator } from "./validator-helpers";

describe("Validator Helpers", () => {
  it("should create an instance", () => {
    const validator = new ValidatorHelpers();
    const testFn = validator.genValidators("req");
  });
  it("should return a valid postal code", () => {
    const fc = new FormControl("V9A3C1", postalCodeValidator());
    fc.updateValueAndValidity();
    expect(fc.valid).toBeTruthy();
    expect(!fc.errors);
  });
  it("should return an invalid postal code", () => {
    const fc = new FormControl("asdflk", postalCodeValidator());
    expect(fc.valid).toBeFalsy();
  });
});
