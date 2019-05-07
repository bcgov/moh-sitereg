import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UUID } from 'angular2-uuid';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class GlobalConfigService {
    // private static instance: GlobalConfigService;
    // private globalConfigServiceSubject = new BehaviorSubject<GlobalConfigService>(null);

    // static getInstance(): GlobalConfigService {
    //     if (!GlobalConfigService.instance) {
    //         GlobalConfigService.instance = new GlobalConfigService();
    //     }
    //     return GlobalConfigService.instance;
    // }

    //#region static

    // public static internalUUID: string ;
    // public static get uuid(): string {

    //     if ( GlobalConfigService.internalUUID ) {
    //         return GlobalConfigService.internalUUID;
    //     } else {
    //         GlobalConfigService.internalUUID = UUID.UUID();
    //     }

    //     return GlobalConfigService.internalUUID;
    // }

    //#endregion

    constructor() {}

    public get applicationId(): string {
        return this.mspApplicationId
            ? this.mspApplicationId
            : this.logRefreshMspApplicationUUID();
    }

    public get currentEnironment() {
        return environment;
    }

    public get isProduction() {
        return true;
        // return environment.production;
    }

    /**
     * Application UUID refers to Application of MSP, means the each application user apply will have a specific uuid
     */
    public get logMspApplicationUUID() {
        return this.mspApplicationId
            ? this.mspApplicationId
            : this.logRefreshMspApplicationUUID();
    }

    public get logMspApplicationName() {
        return 'sitereg';
    }
    // REMOVE ME - debug only - to put default value
    private static autofill = false;

    private mspApplicationId: string;

    public static autofillOn() {
        GlobalConfigService.autofill = true;
    }

    public static setDefaults(): boolean {
        return GlobalConfigService.autofill;
    }

    //#region msp ApplicationId specific

    public logRefreshMspApplicationUUID(): string {
        this.mspApplicationId = UUID.UUID();
        return this.mspApplicationId;
    }

    //#endregion
}
