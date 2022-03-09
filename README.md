# Angular Cogs Website

The current website being used by the Creation of Game Society. This site is built using [Angular](https://angular.io/) and uses [Angular Material](https://material.angular.io/) for UI theming and for some UI components.

## Development

You must have Angular installed to work on this repository.

To install Angular, make sure you have [npm](https://nodejs.org/en/download/) installed and then run 

```bash
> npm install -g @angular/cli
```

This will install angular globally on your computer so you can access the `ng` commands from anywhere.

See [Angular's setup tutorial](https://angular.io/guide/setup-local) for more information.

## Running Site Locally

To serve the site locally on your computer for testing purposes, run

```bash
> ng serve
```

## Building Site

> **IMPORTANT**
> 
> You **DO NOT** need to build the site manually for it to show up on github pages. 
> The building and deploying of the site to github pages is handled automatically by 
> the github actions in this repository.

To build the website for production, run

```bash
> ng build
```

## Running Unit Tests

To open up a browser window that performs all unit tests, run

```bash
> ng test
```

To open up a browser window that performs the unit tests of a single component, run

```bash
> ng test --include='**/component-folder-name/*.spec.ts'
```

where `component-folder-name` is replaced with the folder of the component that you would like to test. 

> **NOTE**
> 
> Note that `**/` means it will recursively search until it finds the folder whose name matches `component-folder-name`.

## Adding Images to Pictures Page

To add images to the pictures page of the website, add the picture into the `src/assets/pictures-page-images/` folder.

Then you must run the `update_images.py` script from this repository's root folder.

> **NOTE** 
> 
> You must have [python](https://www.python.org/downloads/) installed on your computer to run this script.
> 
> Before running this script, make sure you have the required packages installed. You can install the required packages by running
> 
> `pip install -r requirements.txt`
>
> in this repository's root folder.
> The `/*.spec.ts` means it will search for all files that end in `.spec.ts` in the `component-folder-name` folder.
