import { GenerateForm } from "./generate-form";
import {
  IMspOrganization,
  IMspSigningAuthority,
  IMspUsers,
  IUser
} from "@msp-register/interfaces";
import {
  FormControl,
  FormBuilder,
  Validators,
  Validator
} from "@angular/forms";
import {
  required,
  minLength,
  maxLength,
  phoneValidator,
  faxValidator
} from "./validator-helpers";

export class MspRegisterUsers extends GenerateForm<IMspUsers> implements IUser {
  userTitle?: "mr" | "mrs" | FormControl = "mr";
  firstName: string | FormControl = "";
  initial?: string | FormControl = "";
  lastName: string | FormControl = "";
  jobTitle: string | FormControl = "";
  emailAddress: string | FormControl = "";
  confirmEmail: string | FormControl = "";
  phone: string | FormControl = "";
  ext?: string | FormControl = "";
  fax: string | FormControl = "";
  administeringFor: string | FormControl = "";

  get validators() {
    return {
      userTitle: [maxLength(5)],
      firstName: [required, minLength(), maxLength()],
      initial: [maxLength(1)],
      lastName: [required, minLength(), maxLength()],
      jobTitle: [required, minLength(), maxLength()],
      emailAddress: [required, Validators.email, maxLength()],
      confirmEmail: [required, Validators.email, maxLength()],
      phone: [required, phoneValidator()],
      ext: [maxLength()],
      fax: [faxValidator()],
      administeringFor: [required, maxLength()]
    };
  }

  constructor(
    private gf: GenerateForm<IMspOrganization>,
    private newFb: FormBuilder
  ) {
    super(newFb);
    const valid = new FormControl("", Validators.required);
  }
}
