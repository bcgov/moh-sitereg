import { GenerateForm } from "./generate-form";
import { FormBuilder, Validators } from "@angular/forms";
import { IMspOrganization } from "@msp-register/interfaces";
import { postalCodeValidator } from "./validator-helpers";

describe("GenerateForm", () => {
  it("should create an instance", () => {
    const fb = new FormBuilder();
    const gf = new GenerateForm(fb);

    expect(gf).toBeTruthy();
  });
  it("should return an array of controls", () => {
    const fb = new FormBuilder();
    const gf = new GenerateForm(fb);
    const arr = gf.generateArr(["name"], { name: [Validators.required] });
    expect(arr).toBeDefined();
    expect(arr.length).toBe(1);
    expect(arr[0].name).toBe("name");
  });
  it("should return a properly structured form control", () => {
    const fb = new FormBuilder();
    const gf = new GenerateForm(fb);
    const data = [
      "name",
      "address",
      "city",
      "province",
      "postalCode",
      "thirdParty",
      "blueCross",
      "administeringFor"
    ];
    const required = Validators.required;
    const maxLength = (num: number = 100) => Validators.maxLength(num);
    const minLength = (num: number = 3) => Validators.minLength(num);
    function genValidators() {
      return {
        name: [Validators.required, Validators.maxLength(100)],
        address: [required, minLength(), maxLength(100)],
        city: [required, minLength(), maxLength(25)],
        province: [required, minLength(), maxLength(100)],
        postalCode: [required, maxLength(6), postalCodeValidator()],
        blueCross: [required],
        administeringFor: [required]
      };
    }
    const validators = genValidators();
    // const validators = [];
    const arr = gf.generateArr(data, validators);
    const forms = gf.genForms<IMspOrganization>(arr);
    expect(forms).toBeDefined();
    expect(typeof forms.name === "object").toBeTruthy();
    expect(Object.keys(forms).length).toBe(8);
    expect(Object.keys(forms).filter(itm => !data.includes(itm)).length).toBe(
      0
    );
  });
});
