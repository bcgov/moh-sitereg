import { IMspSigningAuthority } from './i-msp-signing-authority';

export interface IMspAuthorize {
  authorities: IMspSigningAuthority[];
  captcha: boolean;
  tAndC: boolean;
}
