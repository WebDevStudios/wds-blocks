# WDS Blocks v1.0.7

WebDevStudios library of Gutenberg blocks.

<a href="https://webdevstudios.com/contact/"><img src="https://webdevstudios.com/wp-content/uploads/2018/04/wds-github-banner.png" alt="WebDevStudios. WordPress for big brands."></a>

## Available Blocks

- Hero
- Call To Action
- Recent Posts Grid
- Multi-select, Related Posts Grid
- Two Column Layout
- Github Gist
- Users Grid

WDS Blocks also come with a robust set of options: background image, video, and color support. Plus, text color, custom CSS classes, and [Animate.css](https://daneden.github.io/animate.css/) support. These blocks have been tested with our starter theme, [wd_s](https://github.com/WebDevStudios/wd_s).

## Tested Up To
- [WordPress](https://wordpress.org/) v4.9.8
- [Gutenberg](https://wordpress.org/plugins/gutenberg/) v3.9.0

## Usage

You must have the [Gutenberg](https://wordpress.org/plugins/gutenberg/) plugin installed and activated.

- [Clone](https://github.com/WebDevStudios/WDS-Blocks.git) or [download a .zip](https://github.com/WebDevStudios/WDS-Blocks/releases)
- Rename `WDS-Blocks-x.x` to `wds-blocks`
- Place `wds-blocks` into `/plugins/`
- Activate this plugin

Head on over to a post or page, and start inserting WDS Blocks!

<img src="https://dl.dropbox.com/s/we5phkd1mpsnnms/Screenshot%202018-04-27%2012.45.27.png?dl=0" width="350">

## Documentation

Check out the [Wiki](https://github.com/WebDevStudios/WDS-Blocks/wiki) for more info.

## Development

Your [contributions](https://github.com/WebDevStudios/WDS-Blocks/blob/master/.github/CONTRIBUTING.md) are welcome. Here's a quick start guide to developing with WDS Blocks.

### Quick Start
There is a "Default Block" which is intended to be a jumping off point. Read the [Default Block page](https://github.com/WebDevStudios/WDS-Blocks/wiki/Blocks#default-block) on the wiki for more.

### File structure
- Blocks are stored in the `/src/blocks/` directory. These are the blocks that users can insert into posts in the wp-admin.
- Components are stored in the `/src/components/` directory. These individual components can can be imported into and used by one or more blocks. Example: If block A and block B both display a dropdown of recent posts, a recent posts component could be created, then imported into and used by both of those blocks.

Please use the following file naming convention for all blocks for consistency:

    my-block
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
1. Namespace any PHP files using the name of your block, such as: `namespace WDS\Blocks\block\my_block;`.

### Code syntax and formatting
- Please write all JavaScript using modern ES6+/ESNext syntax. Webpack is configured to transpile all JS down into ES5 syntax that will work on all browsers, so don't hesitate to use modern JS language features in your code that aren't fully supported by all major browsers yet.
- The project contains an `.eslintrc.json` file that contains JS linting rulesets. Please turn on linting in your editor and format your JS code accordingly.

### NPM Commands

### `npm start`
- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

### `npm run build`
- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

### `npm run eject`
- Use to eject your plugin out of `create-guten-block`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.

## Contributing

Your contributions are welcome. Please follow the [contribution guidelines](https://github.com/WebDevStudios/WDS-Blocks/blob/master/.github/CONTRIBUTING.md).

## Credits

This project was bootstrapped with [Create Guten Block](https://github.com/ahmadawais/create-guten-block).

<br/><br/>
[![wds-logo](https://dl.dropboxusercontent.com/s/71hvyg2dsjj2ubh/webdevstudios-goots-logo.png?dl=0)](https://webdevstudios.com)
