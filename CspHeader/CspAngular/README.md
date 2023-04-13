# CspAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Update 2023-04-12

The project is updated to Angular preview version 16.0.0-next.7. In this [Angular commit in Github](https://github.com/angular/angular/pull/49561/commits/47238292f9f3b1e1071648cb884f5f0057e60a5a)
two new ways to fix CSP related errors are the use of `ngCspNonce` or `CSP_NONCE`. The project has been updated to use the former. The error in the `layout.mjs` file still exists.

Another error has been introduced by applying inline style to a paragraph tag by using the innerHTML attribute.

The generated nonces have to be the same, somehow @Html.CspStyleNonce() generated a difference nonce than @Html.CspScriptNonce(). This can be checked with 'View page source' (in Edge press CTRL + U).