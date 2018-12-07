React/Typescript Demo App
===============

## Setup
1. [Install node.js](https://nodejs.org/en/), get the recommended v8.x LTS version.  npm should be automatically added to your path.  After install, open a command prompt and run `npm`.  You should be shown some help text.
2. Install Visual Studio Code
3. Add the following extensions to VS Code:
    * Debugger for Chrome
    * TSLint
    * Prettier - Code formatter
    * TypeScript Import Sorter
4. Set the following settings in VS Code.  You can paste them directly into the user settings json file.

```
"files.trimTrailingWhitespace": true,
"breadcrumbs.enabled": true,
"typescript.preferences.quoteStyle": "double",
"typescript.updateImportsOnFileMove.enabled": "always",
"typescript.preferences.importModuleSpecifier": "relative",
"[typescript]": {
    "editor.formatOnSave": true
},
"importSorter.importStringConfiguration.quoteMark": "double",
"importSorter.generalConfiguration.sortOnBeforeSave": true
```

## Build
1. Use a terminal to navigate to the project folder.  Any terminal (cmd, powershell, git bash, ...) should work.  You can also use the terminal built into VS Code.
2. Run `npm ci` to restore packages.
3. Run `npm run build-dev` to build the frontend.  If you're going to make changes, use `npm run watch` to have webpack continue running and auto compile on save.

## Reading List
* [Typescript Reference](https://www.typescriptlang.org/docs/handbook/basic-types.html)
* [React Docs](https://reactjs.org/docs/hello-world.html) - Has tutorial, some advanced usage info, and API reference.
* [Redux Docs](https://redux.js.org/basics) - Basics and advanced make up the Redux tutorial, introduction section is also recommended reading.
* [typesafe-actions library](https://github.com/piotrwitek/typesafe-actions) - leveraging the TS type system with Redux actions.
* [react-redux library](https://github.com/reduxjs/react-redux) - provides the glue between the two (containers).
* [react-redux-typescript guide](https://github.com/piotrwitek/react-redux-typescript-guide) - collection of good info for working with React & Redux in TS.
* [redux-thunk](https://github.com/reduxjs/redux-thunk)
* **NOTE** This demo uses observables instead of thunk
* [redux-observables](https://redux-observable.js.org/docs/basics/Epics.html)
* [RxJS Observables Overview](https://rxjs-dev.firebaseapp.com/guide/overview)
