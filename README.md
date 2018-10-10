React/Typescript Demo App
===============

## Setup
1. [Install node.js](https://nodejs.org/en/), get the recommended v8.x LTS version.  npm should be automatically added to your path.  After install, open a command prompt and run `npm`.  You should be shown some help text.
2. Install Visual Studio Code
3. Add the following extensions to VS Code:
    * Debugger for Chrome
    * TSLint
    * TypeScript Hero
4. Set the following settings in VS Code.  You can paste them directly into the user settings json file.

```
"files.trimTrailingWhitespace": true,
"breadcrumbs.enabled": true,
"typescript.preferences.quoteStyle": "single",
"javascript.preferences.quoteStyle": "single",
"typescript.updateImportsOnFileMove.enabled": "always",
"typescriptHero.codeOutline.enabled": false,
"typescriptHero.imports.multiLineWrapThreshold": 120,
"typescriptHero.imports.organizeOnSave": true,
"javascript.preferences.importModuleSpecifier": "relative",
"typescript.preferences.importModuleSpecifier": "relative",
"debug.inlineValues": true,
"editor.tabCompletion": "on",
```

## Build
1. Use a terminal to navigate to the project folder.  Any terminal (cmd, powershell, git bash, ...) should work.  You can also use the terminal built into VS Code.
2. Run `npm ci` to restore packages.
3. Run `npm run build-dev` to build the frontend.  If you're going to make changes, use `npm run watch` to have webpack continue running and auto compile on save.

## Project
*
