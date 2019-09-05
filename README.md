# MOHsiteReg - MSP Direct Acces
### MOH - Ministry of Health Web Application for MSP Registration and Maintenance of Direct Access
For more information about MSP Direct Access, please visit offical [website](https://www2.gov.bc.ca/gov/content/health/practitioner-professional-resources/system-access/msp-direct?keyword=MSP&keyword=Direct "Registering for and maintaining MSP Direct Access").

### Overview
Primary prurpose of application is end user could submit an application for registration and maintenance of organization MSP Direct request.
There are two modules 

1. Registration
2. Update/Maintenance

***
***Developer Information***  

 ## Application Frontend Framework 
 Application developed using Angular Single Page Application, for specific version of CLI and packages please read [package.json](package.json). 

## Running Application 

`npm run start` : for accessing outside the hosting enviornment  
`npm run dev` : for accessing only in hosting enviornment

Browse [http://localhost:4200](http://localhost:4200 "MSP Direct local instance") in your favourite browser.   
you can update default port 4200 to your choice in [package.json](package.json)

## Running e2e Tests
e2e Tests populates application forms with appropirate data, submit application and recieves the confirmation code.  
You can run these tests using following commands in your faviorite console.
Data used in e2e tests can be updated in relevant json data files.

1. ### Registration Application
     console command  : `npm run e2e-register:happy-path-local`  
     for custom data update [registration data file](e2e/data.json "Update relevant data file").
     
2. ### Update Application
     console command  : `npm run e2e-update:happy-path-local`   
     for custom data update [update application data file](e2e/data-update.json).
     
     
## Code Linting

`npm run lint` : runs linting on the code.

## Code Format

`npm run format` : will format the all typescript code files.

## Code Publish

OpenShift builds are running on prod build. 
Therefore, please verify all updates to code till publish is successfull by running following
command : `npm run publish` 

## Pre Build

This fetchs and update the last commit hash. Which you could find in the application console window.  
command  : `npm run prebuild` 

## Checklist of Developers

For any new commits in code,  ensure following checklist  
### Before Commit

- [ ] Run Accessibility, ensure there is no Accessibilty errors or warning. refer to any accessibility tool or use [Wave Accessibility Plugin](https://wave.webaim.org/).
- [ ] Run Code format on specific files changed. For more info read section [code format](#code-format).
- [ ] Run Code Linting All linting errors must be removed. For more info read section [code lint](#Code-Linting) .
- [ ] e2e tests must be passed for for [registration](#Registration-Application) and [update](#Update-Application). For more info read section [e2e tests](#Running-e2e-Tests).
- [ ] Angular prod build must be working. For more info read section [code publish](#Code-Publish).

***
