# MohSitereg

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Remaining Work on Moh-sitereg

### Forms

All the form work is done except the last page where there's an agreement that's generated and I didn't have text for as well as a the checkboxes to confirm access granted. I wasn't quite sure how those were to be implemented.

The captcha on page 6 is implemented as a component but needs the url for where the captcha is coming from and any other configuration required to register the form for the captcha.

### Guards

The stepper state is managed by implementing guards for each page with a function to validate the step they are on has had the form completed.
The form validaty is checked in the state service for the form by running the valid method on the formgroup.
`this.formgroup.valid`

### HTTP

The http service has been partially implemented but needs a route. There are transformation functions written that transform the value of the form data to the transmission value and validate they are correct.

#### Transformations

The transformations are inlcuded in the msp-register-data.service.ts file. I have attached unit tests in the project that confirm they are working correctly and show their usage.

#### Custom Validators

There are custom validators written in the 'validator-helpers model'. These are the ones that need to be adjusted on the back-end

##### Postal Code

`^[ABCEGHJ-NPRSTV-Z][0-9][ABCEGHJ-NPRSTV-Z][0-9][ABCEGHJ-NPRSTV-Z][0-9]$`

##### Phone Numbers

`^[0-9]{3}[-]{1}[0-9]{3}[-]{1}[0-9]{4}$`
