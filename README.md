# WDS Gutenberg

Library of Gutenberg blocks for WDS to use on client projects. Please follow the instructions below to get spun up.

## Prequisites
- [Node/NPM](https://nodejs.org/en/)
- Bash

Until this plugin is made public, you will need to have the following plugins installed:

- [Advanced Custom Fields Pro v5+
](https://www.advancedcustomfields.com/) (for converting our existing ACF blocks)
- [Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/) (to pull the Lab DB)

This will ensure that we're able to re-create our ACF content blocks. When those blocks have been converted, we can drop this requirement. We will also working with [wd_s](https://github.com/WebDevStudios/wd_s/tree/feature/gutenberg) Gutenberg branch to ensure it supports *all* the blocks.

*It's recommended you use a fresh install for your local. There is a [WDS Lab](http://gutenberg.wdslab.com) instance.*

## Project Onboarding

### Import using Local by Flywheel...

1. Download [gutenberg-local](https://drive.google.com/open?id=1JftWqLd9ThBTmr4U3O9mX5bc8Rub8AJc) (361MB .zip) 
2. Import into Local

### ...Or run the install script (bash)


1. Clone this repository into `wp-content/plugins`
2. Run the following command: `cd wds-gutenberg && sh goots.sh`

Note: This script will clone [WordPress Gutenberg](https://github.com/WordPress/gutenberg) and [wd_s](https://github.com/WebDevStudios/wd_s/tree/feature/gutenberg). It will also "build" all three plugins, so you can get started right away.

## Plugin Development

### File structure
- Gutenberg blocks are stored in the `/src/blocks/` directory. These are the blocks that users can insert into posts in the wp-admin.
- Components are stored in the `/src/components/` directory. These individual components can can be imported into and used by one or more blocks. Example: If block A and block B both display a dropdown of recent posts, a recent posts component could be created, then imported into and used by both of those blocks.

Please use the following file naming convention for all blocks for consistency:

    /example-block/  
      |-- editor.scss   (styles for the backend only)
      |-- endpoints.php (any REST API endpoints)
      |-- icon.js       (the block's SVG icon)
      |-- index.js      (required to register the block)
      |-- render.php    (the PHP render callback function for dynamic blocks)
      |-- style.scss    (styles for both frontend & backend)


`index.js` is the only file that is required, since that's where the block is registered. Beyond any listed above, your block can also include additional files, as needed - just give them names that make sense.

### How to add a new block

1. Create a new directory inside of `/src/blocks/` with a name like `my-block`.
1. Inside of that new directory, create an `index.js` file. This is where the call to `registerBlockType()` to register the block needs to be.
1. Inside of `/src/blocks.js`, add a line like the following to import your new block: `import './blocks/my-block/index.js';`. This will ensure that you're new block is included in the webpack build process.
1. For any other JS or SCSS files your block uses, be sure to `import` them from within `index.js`. Any PHP files included in your block's directory will be loaded up automatically – you don't need to worry about adding `require`/`include` statements anywhere.
1. Namespace any PHP files using the name of your block, such as: `namespace WDS_Gutenberg\Src\My_block;`.

### Code syntax and formatting
- Please write all JavaScript using modern ES6+/ESNext syntax. Webpack is configured to transpile all JS down into ES5 syntax that will work on all browsers, so don't hesitate to use modern JS language features in your code that aren't fully supported by all major browsers yet.
- The project contains an `.eslintrc.json` file that contains JS linting rulesets. Please turn on linting in your editor and format your JS code accordingly.

### NPM Commands

### 👉  `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

### 👉  `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

### 👉  `npm run eject`
- Use to eject your plugin out of `create-guten-block`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.

## Theme Development

- wd_s must be 100% compatible with all blocks. If you imported from Local or ran the install script, then wd_s has been cloned using the `feature/gutenberg` branch. Please work in that branch, and push up PRs for review.

## Gulp Commands

### 👉  `gulp watch`
- Will monitor the directory and automatically compile as neeed.

### 👉  `gulp`
- Use to compile everything.

--

This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block).
<br/><br/>
[![wds-logo](https://dl.dropboxusercontent.com/s/71hvyg2dsjj2ubh/webdevstudios-goots-logo.png?dl=0)](https://webdevstudios.com)