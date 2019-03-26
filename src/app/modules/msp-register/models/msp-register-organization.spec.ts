import { MspRegisterOrganization } from "./msp-register-organization";
import { FormBuilder } from "@angular/forms";
import { GenerateForm } from "./generate-form";
import { MspRegisterAccessAdmins } from "./msp-register-access-admins";

const fb = new FormBuilder();
const mro = new MspRegisterAccessAdmins(new GenerateForm(fb), fb);

/*
  SH: there's only one test for the *-register-*.ts classes as the implementation of those
  only requires that they generate the valid keys for the class.
  This is because the valid keys have to go somewhere and since typescript is scrubbed at run-time
  I couldn't come up with a better solution than creating distinc classes for them.
  I don't think there's a functional solution to this but open to suggestions.
  You can alwaqys create a version of each of the classes in this test file - don't see the point right now.
*/
describe("MspRegisterOrganization", () => {
  it("should create an instance", () => {
    expect(mro).toBeTruthy();
  });
  it("should generate an array of the objects values", () => {
    const keys = mro.genKeys;
    expect(keys).toBeDefined();
  });
});
