export interface IMspRegisterState {
  state: currentState;
  valid: boolean;
}

type currentState =
  | "organization"
  | "signingAuthority"
  | "accessAdmin"
  | "users"
  | "mspGroupNumbers"
  | "authorize";
