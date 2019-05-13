// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    useDummyData: false,
    useMockBackend: false,
    baseAPIUrl: '/sitereg/api/siteregIntegration/sitereg/',
    loggingURL: '/sitereg/api/logging',
    captchaApiBaseUrl: '/sitereg/api/captcha',
    envServerUrl: '/sitereg/api/env',
    logHTTPRequestsToConsole: true,
    bypassGuards: true,
    bypassSplashPage: false,
    promptOnExit: false,
    purgeWhenInactive: false,
    enableLogging: true,
    /** Show additional debug information such as Technical Details on submission */
    debug: true,
    /** Link used in app */
    links: {
        FAQ: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/pharmacare-for-bc-residents/who-we-cover/fair-pharmacare-plan/frequently-asked-questions-about-registration-income-and-consent',
        FormularySearch: 'https://pharmacareformularysearch.gov.bc.ca/',
        HIBC: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/pharmacare-for-bc-residents/contact-us',
        MSP: 'https://www2.gov.bc.ca/gov/content/health/health-drug-coverage/msp',
        CRA: 'https://www.canada.ca/en/revenue-agency.html'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
