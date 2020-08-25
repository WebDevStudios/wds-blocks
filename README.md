# WDS Blocks

[![buddy pipeline](https://app.buddy.works/webdevstudios/wds-blocks/pipelines/pipeline/145265/badge.svg?token=2471ae60766a1e9a657f772e493188dde748aa18c236d0b1c325e80be13a2ac6 'buddy pipeline')](https://app.buddy.works/webdevstudios/wds-blocks/pipelines/pipeline/145265)

WebDevStudios library of Gutenberg blocks.

<a href="https://webdevstudios.com/contact/"><img src="https://webdevstudios.com/wp-content/uploads/2018/04/wds-github-banner.png" alt="WebDevStudios. Your Success is Our Mission."></a>

## Requirements

-   [Node LTS](https://nodejs.org/en/)
-   [Composer](https://getcomposer.org/)
-   [WordPress 5.0+](https://wordpress.org)

---

## Development

Your [contributions](https://github.com/WebDevStudios/WDS-Blocks/blob/master/.github/CONTRIBUTING.md) are welcome. Here's a quick start guide to developing with WDS Blocks.

### Quick Start

There is a "Rich Text Block" which is intended to be a jumping off point.

### File structure

-   Blocks are stored in the `/src/blocks/` directory. These are the blocks that users can insert into posts in the wp-admin.

Please use the following file naming convention for all blocks for consistency:

    my-block
        ├── edit.js       (describes the structure of your block in the context of the editor)
        ├── editor.scss   (styles for the backend only)
        ├── index.js      (required to register the block)
        ├── save.js       (defines the way in which the different attributes should be combined)
        └── style.scss    (styles for both frontend & backend)

`index.js` is the only file that is required, since that's where the block is registered. Beyond any listed above, your block can also include additional files, as needed - just give them names that make sense.

### How to add a new block

1. Inside of `/src/blocks/`, duplicate the `rich-text` block and rename it.
1. Inside of that new directory, open the `index.js` file. This is where the call to `registerBlockType()` to register the block needs to be.
1. Inside of `/src/blocks.js`, add a line like the following to import your new block: `import './blocks/my-block';`. This will ensure that you're new block is included in the webpack build process.
1. Namespace any PHP files using the name of your block, such as: `namespace WebDevStudios\Blocks\block\my_block;`.

## Installation

Install dependencies:

```bash
npm install
```

Rename the files and functions to meet your needs.

---

## Development

Watch for changes:

```bash
npm run start
```

Build a production version:

```bash
npm run build
```

### Other handy commands

Lint JS:

```bash
npm run lint:js
```

Lint SCSS/CSS:

```bash
npm run lint:css
```

Lint PHP:

```bash
composer run lint
```

### Webpack Config (optional)

The optional `webpack.config.js` file includes the `@wordpress/scripts` defaults, along with an entry path for `/src/frontend.js`. The frontend entry path is conditionally included and is not a requirement. It can be safely deleted.

---

## Contributing and Support

Your contributions and [support tickets](https://github.com/WebDevStudios/WDS-Blocks/issues) are welcome. Please see our [guidelines](https://github.com/WebDevStudios/WDS-Blocks/blob/master/.github/CONTRIBUTING.md) before submitting a pull request.
