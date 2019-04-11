import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {

  constructor() { }

  public applicationId: string;

  public get currentEnironment() {
    return environment;
  }
}

