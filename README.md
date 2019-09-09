# MOHsiteReg - MSP Direct Acces
### MOH - Ministry of Health Web Application for MSP Registration and Maintenance of Direct Access
For more information about MSP Direct Access, please visit the official [website](https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/system-access/msp-direct?keyword=MSP&keyword=Direct "Ministry of Health website for organization registration and maintenance of MSP Direct Access.").

### Overview
The primary purpose of application is end-user could apply registration and maintenance of organization MSP Direct request.
Application consists of two modules

1. Registration
2. Update/Maintenance

***
***Developer Information***  

 ## Application Frontend Framework 
 Application developed using Angular Single Page Application Framework. Please read [package.json](package.json) for the specific version of CLI  and dependencies.
 
## Running Application 

`npm run start`: Application is accessible outside the hosting environment.  
`npm run dev`: Application is accessible only in the hosting environment.

Browse http://localhost:4200 in your favorite browser.      
Default port can be update in scripts section of [package.json](package.json)

## Running e2e Tests
e2e tests populate application forms with appropriate data. Automated e2e tests apply for registration and maintenance and receives confirmation code.  
Data uses in e2e tests can be updated in relevant JSON data files.

1. ### Registration Application
     Console command  : `npm run e2e-register:happy-path-local`  
     For custom data update [registration data file](e2e/data.json "Update relevant data file").
     
2. ### Update Application
     Console command  : `npm run e2e-update:happy-path-local`   
     For custom data update [update application data file](e2e/data-update.json).
     
     
## Code Linting

`npm run lint`: runs linting on the code.

## Code Format

`npm run format`: `npm run format`: formats all typescript code files.

## Code Publish

Application all environments are set up to deploy application in production build of Angular using OpenShift Kubernetes.

Verify all changes to code are serving for production build of Angular by running following
Console command: `npm run publish` 

## Pre Build

This fetch and update the last commit hash. Application last commit has could be found in deployed application browser console window.
Console Command: `npm run prebuild` 

## Checklist of Developers

The following checklists are intended to guide developers on the implementation of success criteria for coding. The checklists should be used during the development phase to ensure compliance of all coding on the site and should form part of the testing phase undergone by developers when updating code.

### Before Commit

- [ ] Run Accessibility, Refer to appropriate accessibility tool or use [Wave Accessibility Plugin](https://wave.webaim.org/).
- [ ] Format code. Use section [code format](#code-format) for automated formatting. .
- [ ] Lint Code, use section [code lint](#Code-Linting).
- [ ] e2e tests are passing for [registration](#Registration-Application) and [update](#Update-Application). For more information read section [e2e tests](#Running-e2e-Tests).
- [ ] Angular production build is working. For more information read section [code publish](#Code-Publish).

***



***
***Additional Settings***  
## Maitenance Mode / Splash Page

For maintenance messages, a feature splash messages is available in the application.  
Splash page could be enabled using environment variables for the "spa-env-server" in the connected environment in OpenShift.

To enable maintenance page:
1. Go to the correct OpenShift environment (e.g. dev/test/prod)
2. Applications > Deployments > spa-env-server
3. Environment tab
4. Set SPA_ENV_FPC_MAINTENANCE_START and SPA_ENV_FPC_MAINTENANCE_END

The spa-env-server will automatically set the maintenance mode flag between these times.

SPA_ENV_FPC_MAINTENANCE_MESSAGE is an optional field.  If anything is provided it will be displayed on the page below the default splash page. If it is empty, only the default page is shown with no custom message.

## Application Styling
Application is using various moh-common-styles library components. These Angular components are regularly maintained and implemented in various web applications of the Ministry of Health.  
For more information please visit [moh-common-styles repository](https://github.com/bcgov/moh-common-styles).