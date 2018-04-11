# WDS Gutenberg

Library of Gutenberg blocks for WebDevStudios to use on client projects. Please follow the instructions below to get spun up.

# Table of Contents
1. [Prequisites](#prerequisites)
2. [Project Onboarding](#project-onboarding)
3. [Plugin Development](#wds-gutenberg-plugin-development)
4. [Theme Development](#theme-development)
5. [Contributing](#contributing)

## Prequisites
- [Node/NPM](https://nodejs.org/en/)
- [Advanced Custom Fields Pro v5+
](https://www.advancedcustomfields.com/) (for testing and converting our existing ACF blocks)
- [Migrate DB Pro](https://deliciousbrains.com/wp-migrate-db-pro/) (to pull the Lab DB)

**Why?**

This will ensure that you're able to re-create our ACF content blocks for testing, and MigrateDB Pro ensures that you will stay in sync with WDS Lab. We will also working with [wd_s](https://github.com/WebDevStudios/wd_s/tree/feature/gutenberg) `feature/gutenberg` branch, to ensure our theme supports *all* blocks.

When all the ACF blocks have been converted, we can drop the ACF Pro requirement. When this plugin goes live, we can drop MigrateDB Pro requirement too.

## Project Onboarding

The Project is actually made up of 4 libraries, 3 of which have their own git repo:

    wp-content
        ├── plugins
        │   ├── advanced-custom-fields-pro For converting ACF Blocks to Gutenberg (not version controlled)
        │   ├── gutenberg                  The core Gutenberg plugin (master)
        │   └── wds-gutenberg              The WDS Gutenberg Plugin (master)
        └── themes
            └── wd_s                       WebDevStudios' starter theme. (feature/gutenberg)

### Install script (bash)

Set up a fresh local install of WordPress at [https://gutenberg.test](https://gutenberg.test). Then...

1. Open your terminal
2. CD into `wp-content/plugins`
3. Run the following command: `git clone git@github.com:WebDevStudios/wds-gutenberg.git && cd wds-gutenberg && sh install.sh`
4. Download, install, and activate both Advanced Custom Fields Pro and MigrateDB Pro
5. Import the database using MigrateDB Pro (credentials in the 1pass vault: WDS Gutenberg)

*Note: This script will clone [WordPress Gutenberg](https://github.com/WordPress/gutenberg) and [wd_s](https://github.com/WebDevStudios/wd_s/tree/feature/gutenberg). It will also "build" all three libraries, so you can get started right away.*

### Updating (bash)

1. CD into `wp-content/plugins/wds-gutenberg`
2. type `sh update.sh`

This will do a quick `git pull` on all three repositories in this project.

## WDS Gutenberg Plugin Development

### File structure
- WDS Gutenberg blocks are stored in the `/src/blocks/` directory. These are the blocks that users can insert into posts in the wp-admin.
- Components are stored in the `/src/components/` directory. These individual components can can be imported into and used by one or more blocks. Example: If block A and block B both display a dropdown of recent posts, a recent posts component could be created, then imported into and used by both of those blocks.

Please use the following file naming convention for all blocks for consistency:

    default
        ├── editor.scss   (styles for the backend only)
        ├── endpoints.php (any REST API endpoints)
        ├── icon.js       (the block's SVG icon)
        ├── index.js      (required to register the block)
        ├── render.php    (the PHP render callback function for dynamic blocks)
        └── style.scss    (styles for both frontend & backend)

`index.js` is the only file that is required, since that's where the block is registered. Beyond any listed above, your block can also include additional files, as needed - just give them names that make sense.

### How to add a new block

1. Inside of `/src/blocks/`, duplicate the `default` block and rename it.
1. Inside of that new directory, open the `index.js` file. This is where the call to `registerBlockType()` to register the block needs to be.
1. Inside of `/src/blocks.js`, add a line like the following to import your new block: `import './blocks/my-block';`. This will ensure that you're new block is included in the webpack build process.
1. For any other JS or SCSS files your block uses, be sure to `import` them from within `index.js`. Any PHP files included in your block's directory will be loaded up automatically – you don't need to worry about adding `require`/`include` statements anywhere.
1. Namespace any PHP files using the name of your block, such as: `namespace WDS\Gutenberg\blocks\my_block;`.

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

## wd_s Theme Development

wd_s must be 100% compatible with all blocks. If you imported from Local or ran the install script, then wd_s has been cloned using the `feature/gutenberg` branch.

- Be sure that all blocks look and work as expected in the Dashboard
- Check to see that blocks display correctly on the front-end
- If a block is broken, create an issue at [WDS Gutenberg](https://github.com/WebDevStudios/wds-gutenberg/issues) and assign the label: [wd_s](https://github.com/WebDevStudios/wds-gutenberg/labels/wd_s)
- Please branch off the `feature/gutenberg`, and push up PRs for review
- Code reviews will have to happen in the [wd_s repo](https://github.com/WebDevStudios/wd_s/pulls)

### Gulp Commands

### 👉  `gulp watch`
- Will monitor the directory and automatically compile as neeed.

### 👉  `gulp`
- Use to compile everything.

### Contributing

We welcome all contributions.

- Create a new issue here: [https://github.com/WebDevStudios/wds-gutenberg/issues](https://github.com/WebDevStudios/wds-gutenberg/issues)
- Assign the label: [bug](https://github.com/WebDevStudios/wds-gutenberg/labels/bug)

--

This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block).
<br/><br/>
[![wds-logo](https://dl.dropboxusercontent.com/s/71hvyg2dsjj2ubh/webdevstudios-goots-logo.png?dl=0)](https://webdevstudios.com)