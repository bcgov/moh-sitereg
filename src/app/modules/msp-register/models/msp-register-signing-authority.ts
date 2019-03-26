import { GenerateForm } from "./generate-form";
import {
  IMspOrganization,
  IMspSigningAuthority
} from "@msp-register/interfaces";
import { FormControl, FormBuilder, Validators } from "@angular/forms";
import {
  required,
  maxLength,
  minLength,
  phoneValidator,
  faxValidator
} from "./validator-helpers";

export class MspRegisterSigningAuthority
  extends GenerateForm<IMspSigningAuthority>
  implements IMspSigningAuthority {
  directAccess: boolean | FormControl = false;
  alsoAdmin: boolean | FormControl = false;
  userTitle?: FormControl | "mr" | "mrs" = null;
  firstName: string | FormControl = "";
  initial?: string | FormControl = "";
  lastName: string | FormControl = "";
  jobTitle: string | FormControl = "";
  emailAddress: string | FormControl = "";
  phone: string | FormControl = "";
  ext?: string | FormControl = "";
  fax: string | FormControl = "";
  administeringFor: string | FormControl;
  confirmEmail: string | FormControl = "";
  get validators() {
    return {
      directAccess: [required],
      alsoAdmin: [required],
      userTitle: [maxLength(5)],
      firstName: [required, minLength(), maxLength()],
      initial: [maxLength(1)],
      lastName: [required, minLength(), maxLength()],
      jobTitle: [required, minLength(), maxLength()],
      emailAddress: [required, Validators.email, maxLength()],
      confirmEmail: [required, Validators.email, maxLength()],
      phone: [required, phoneValidator()],
      ext: [maxLength()],
      fax: [faxValidator()]
    };
  }

  constructor(
    private gf: GenerateForm<IMspOrganization>,
    private newFb: FormBuilder
  ) {
    super(newFb);
  }
}
