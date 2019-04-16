
import { CommonLogger, CommonLogMessage } from 'moh-common-lib/services';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfigService } from './global-config.service';


export interface LogMessage {
    event: string;
    [key: string]: any;
}

@Injectable({
    providedIn: 'root'
})
export class LoggerService extends CommonLogger {

    protected isProduction: boolean = true;
    protected loggingUri: string;
    public program: string;
   
    constructor(
        protected http: HttpClient,
        private globalConfigSvc: GlobalConfigService) {

        super(http);

        // todo: program name should be from enviornment

        // this.isProduction = this.globalConfigSvc.currentEnironment.production;
        this.programName =  this.globalConfigSvc.logMspApplicationName;
        this.applicationId = this.globalConfigSvc.logMspApplicationUUID;
        this.setURL(this.globalConfigSvc.currentEnironment.loggingURL);
   }


    /**
     * Overrided function - must have event within the interface
     * @param message
     */
    public log(message: LogMessage) {
        try {

            console.log(`%c Splunk Logger Object => %o`, 'color:orange', this);
            const clog = message as CommonLogMessage;
            console.log(`%c  Splunk Log: => %o`, 'color:orange', clog);

            this._log(message as CommonLogMessage);


            // console.log(`%c Logger Object => %o`, 'color:orange', this);
            // this.isProduction
            // ? this._log(message as CommonLogMessage)
            // : console.log(`%c Splunk Log: %o`, 'color:green', message);
        } catch (e) {
            console.log(`%c Error while Logging [ %o ] : exception:  %o`, 'color:red', message, e);
        }
    }

    /**
     * Overrided function - must have event within the interface
     * @param errorMessage
     */
    public logError(errorMessage: LogMessage) {

        const elog = errorMessage as CommonLogMessage;
        console.log(`%c  Splunk Log (error): => %o`, 'color:orange', elog);

        this._logError(errorMessage as CommonLogMessage);
        // this.isProduction
        //     ? this._logError(errorMessage as CommonLogMessage)
        //     : console.log(`%c Splunk Error: %o`, 'color:red', errorMessage);
    }

    /** Log Navigation */
    public logNavigation(navItem: string, navItemValue: string) {
        this.log({
            event: 'navigation',
            status: `${navItem.toUpperCase()} : ${navItemValue}`
        });
    }
}