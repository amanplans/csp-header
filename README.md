# csp-header
This project is created to show the Content Security Policy (CSP) error in Angular. The project is a .NET Framework 4.8 MVC application with Angular 15 embedded in it.

In order to add the CSP header, we make use of NWebSec, the configuration can be found in the `Startup.Auth.cs` file. To add a nonce to Style and Script tags we have added the following lines of code to the `_Layout.cshtml` file.

```
<style @Html.CspStyleNonce()></style>
<script @Html.CspScriptNonce()></script>
```

After the Angular project is built, we put the result in the `Bundles/AngularModules` folder with the following line in the `angular.json` file.

```
"outputPath": "../Bundles/AngularModules",
```

We have to bundle the output from Angular, we do that in the file `BundleConfig.cs` with

```
bundles.Add(new Bundle("~/Script/Bundles/AngularModules")
	.IncludeDirectory("~/Bundles/AngularModules", "*.js", true));
```

To embed Angular we have added the following lines of code to the `_Layout.cshtml` file

```
<app-root></app-root>
@Scripts.Render("~/Script/Bundles/AngularModules")
```

# Prerequisites
Since this project uses .NET Framework 4.8, it will not work on Mac or Linux.

# Installing
Install the [.NET Framework 4.8 Developer pack](https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48)

Angular

```
npm install
```

# Run
First build the Angular project
```
npm run build
```

Then start the MVC project (in Visual Studio).

# CSP error
Open DevTools in the browser. In the Console log (tab), you will see an error like:

`
Refused to apply inline style because it violates the following Content Security Policy directive: "style-src 'self' 'nonce-B/QNx75XM84YLWpnHcVPghih' fonts.googleapis.com". Either the 'unsafe-inline' keyword, a hash ('sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU='), or a nonce ('nonce-...') is required to enable inline execution.
`

on line 83 of the layout.mjs from the Angular CDK.

# Solving errors

Error 1:
After cloning the repository and building the MVC application for the first time. It can fail and show this error

```
Could not find a part of the path '~\csp-header\CspHeader\bin\roslyn\csc.exe'.
```

If that happens, clean and rebuild the application (in Visual Studio).

Error 2:
If building the Angular project fails.

Try to run 
```
ng update @angular/core@15 @angular/cli@15
```

and 

```
ng update @angular/material@15
```

Then build again.

# Sources

- [How to embed Angular 4 in a .NET Framework 4.8 MVC project](https://dotnetthoughts.net/how-to-use-angular4-wth-aspnet-mvc/)
- [Add nonce to Content Security Policy in Angular](https://dev.to/ferdiesletering/how-to-implement-an-inline-styles-content-security-policy-with-angular-and-nginx-2ke2)


## Update 2023-04-12

The project is updated to Angular preview version 16.0.0-next.7. In this [Angular commit in Github](https://github.com/angular/angular/pull/49561/commits/47238292f9f3b1e1071648cb884f5f0057e60a5a)
two new ways to fix CSP related errors are the use of `ngCspNonce` or `CSP_NONCE`. The project has been updated to use the former. The error in the `layout.mjs` file still exists.

Another error has been introduced by applying inline style to a paragraph tag by using the innerHTML attribute.

The generated nonces have to be the same, somehow @Html.CspStyleNonce() generated a difference nonce than @Html.CspScriptNonce(). This can be checked with 'View page source' (in Edge press CTRL + U).
