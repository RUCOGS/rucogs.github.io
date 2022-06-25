# Angular Cogs Website

The current website being used by the Creation of Game Society. This site is built using [Angular](https://angular.io/) and uses [Angular Material](https://material.angular.io/) for UI theming and for some UI components.

## Setting Up Local Development

1. Clone this repository onto your machine.

2. Before you start development, you must have Node.js installed. "Node.js" is a runtime environment, and downloading it should also give you the "npm" package manager. You can download the latest version of Node.js with npm from [here](https://nodejs.org/en/download/).

3. Install all the relevant dependecies by running the following inside the folder containing the repository.
  ```bash
  > npm i
  ```

4. `(Optional)` Install Angular globally on your machine, which lets you access `ng` commands from anywhere.

```bash
> npm install -g @angular/cli
```

### Debugging

1. Following this [video guide](https://www.youtube.com/watch?v=H-sMmxfNxBM) to get set up with debugging in VSCode
> **NOTE**
> 
> Our "./client" folder is actually the entire repository.
> Therefore for in `launch.json`, we use
> ```
> "webRoot": "${workspaceFolder}",
> ```
> And in `tasks.json`, we use
> ```
> "options": {
>   "cwd": "${workspaceFolder}"
> },
> ```
2. Make sure your nodejs version is one that's supported by our version of angular. As of writing, this [gist](https://gist.github.com/LayZeeDK/c822cc812f75bb07b7c55d07ba2719b3) contains an up-to-date list of supported nodejs versions.

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

```bash
> py update_images.py
```

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

## Adding Articles to the Blog Page

To add articles to the blog page of the website, add the article into the `src/assets/articles/` folder.

Then you must run the `py update_articles.py` script from this repository's root folder.

```bash
> py update_articles.py
```

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