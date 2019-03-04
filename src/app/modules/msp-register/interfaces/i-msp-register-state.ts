export interface IMspRegisterState {
  state: currentState;
}

type currentState = 'organization' | 'signingAuthority' | 'accessAdmin' | 'users' | 'mspGroupNumbers' | 'authorize';
