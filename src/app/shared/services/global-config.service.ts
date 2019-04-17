import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UUID } from 'angular2-uuid';

@Injectable({
    providedIn: 'root',
})
export class GlobalConfigService {
    constructor() {}

    public applicationId: string;

    public get currentEnironment() {
        return environment;
    }

    //#region msp ApplicationId specific

    private mspApplicationId: string;

    public logRefreshMspApplicationUUID(): string {
        this.mspApplicationId = UUID.UUID();
        return this.mspApplicationId;
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

    //#endregion
}
