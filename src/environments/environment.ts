// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    useDummyData: false,
    useMockBackend: false,
    baseAPIUrl: '/sitereg/api/siteregIntegration/sitereg/',
    loggingURL: '/sitereg/api/logging',
    // captchaApiBaseUrl: '/sitereg/api/captcha',
    envServerUrl: '/sitereg/api/env',
    logHTTPRequestsToConsole: true,

    /** Implemented in msp-update module */
    bypassGuards: true,
    bypassSplashPage: false,
    promptOnExit: false,
    purgeWhenInactive: false,
    enableLogging: true,
    /** Do not display the modal at beginning of flow. */
    bypassInformationCollectionNotice: true,
    /** Show additional debug information such as Technical Details on submission */
    debug: true,
    /** Link used in app */
    links: {
        FAQ:
            'https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/system-access/msp-direct',
        MSP:
            'https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/system-access/msp-direct',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
