import { CommonLogger, CommonLogMessage } from 'moh-common-lib/services';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalConfigService } from './global-config.service';
import { environment } from 'src/environments/environment.prod';

export interface LogMessage {
    event: string;
    [key: string]: any;
}

@Injectable({
    providedIn: 'root',
})
export class LoggerService extends CommonLogger {
    protected isProduction = true;
    protected loggingUri: string;
    public program: string;

    constructor(
        protected http: HttpClient,
        private globalConfigSvc: GlobalConfigService
    ) {
        super(http);

        // todo: program name should be from enviornment

        // this.isProduction = this.globalConfigSvc.currentEnironment.production;
        this.programName = this.globalConfigSvc.logMspApplicationName;
        this.applicationId = this.globalConfigSvc.applicationId;
        this.setURL(this.globalConfigSvc.currentEnironment.loggingURL);
        //  console.log(`%o <= Logger Application ID`, this.applicationId);
    }

    /**
     * Overrided function - must have event within the interface
     * @param message :  log message
     */
    public log(message: LogMessage) {
        try {
            // console.log(`%c Splunk Logger Object => %o`, 'color:orange', this);

            // const clog = message as CommonLogMessage;
            // console.log(`%c  Splunk Log: => %o`, 'color:orange', clog);
            // this._log(message as CommonLogMessage);

            //  console.log(`%o <= Logger Application ID at Log`, this.applicationId);

            !environment.debug
                ? this._log(message as CommonLogMessage)
                : console.log(
                      `%c splunk-log \n\t %o`,
                      'color:lightgreen',
                      message
                  );
        } catch (e) {
            console.log(
                `%c splunk-log-error [ %o ] : exception:  %o`,
                'color:red',
                message,
                e
            );
        }
    }

    /**
     * Overrided function - must have event within the interface
     * @param errorMessage : error message
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
            status: `${navItem.toUpperCase()} : ${navItemValue}`,
        });
    }
}
