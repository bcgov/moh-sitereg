export const environment = {
    production: true,
    useDummyData: false,
    useMockBackend: false,
    baseAPIUrl: '/sitereg/api/siteregIntegration/sitereg/',
    baseUpdateAPIUrl: '/sitereg/api/siteregIntegration/siteregmaintenance/',
    captchaApiBaseUrl: '/sitereg/api/captcha',
    loggingURL: '/sitereg/api/logging',
    envServerUrl: '/sitereg/api/env',
    logHTTPRequestsToConsole: false,
    bypassSplashPage: false,
    bypassGuards: false,
    promptOnExit: true,
    purgeWhenInactive: true,
    enableLogging: true,
    bypassInformationCollectionNotice: true,
    debug: false,
    /** Link used in app */
    links: {
        FAQ:
            'https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/system-access/msp-direct',
        MSP:
            'https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/system-access/msp-direct',
    },
};
