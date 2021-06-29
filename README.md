# WDS Blocks <!-- omit in toc -->

WebDevStudios library of Gutenberg blocks.

[![WebDevStudios. Your Success is Our Mission.](https://webdevstudios.com/wp-content/uploads/2018/04/wds-github-banner.png)](https://webdevstudios.com/contact/)


## Current blocks

-   Accordion
-   Carousel

---

## Table of Contents <!-- omit in toc -->

- [Current blocks](#current-blocks)
- [Use as WordPress Plugin](#use-as-wordpress-plugin)
- [Plugin Development](#plugin-development)
	- [Requirements](#requirements)
	- [Install](#install)
- [Development](#development)
	- [NPM Scripts](#npm-scripts)
	- [Linting](#linting)
	- [Webpack Config (optional)](#webpack-config-optional)
- [Contributing and Support](#contributing-and-support)

---

## Use as WordPress Plugin

1. Download [WDS Blocks](https://github.com/WebDevStudios/wds-blocks/archive/refs/heads/main.zip)
2. Extract `wds-blocks-main.zip` into your project's `/plugins` directory
3. Activate the plugin in the WordPress Dashboard

---

## Plugin Development

If you're interested in using WDS Blocks to get started building your own blocks, follow the instructions below:

### Requirements

-   [Node 14](https://nodejs.org/en/)
-   [NPM 7](https://nodejs.org/en/)
-   [Composer](https://getcomposer.org/)
-   [WordPress 5.0+](https://wordpress.org)

### Install

Clone the repo with Git:

```bash
git clone git@github.com:WebDevStudios/wds-blocks.git
```

Install dependencies:

```bash
npm i --legacy-peer-deps
```

```bash
composer install
```

---

## Development

WDS Blocks using @wordpress/scripts to handle compiling assets and watching for changes.

See the [Official Gutenberg Developer Documentation](https://developer.wordpress.org/block-editor/#develop-for-the-block-editor) for extensive tutorials, documentation, and API references.

### NPM Scripts

Use the following commands to get started:

Watch for changes:

```bash
npm start
```

Build a production version of WDS Blocks:

```bash
npm run build
```

### Linting

Lint the codebase:

```bash
npm run lint
```

Format the codebase with Prettier:

```bash
npm run format
```

### Webpack Config (optional)

The optional `webpack.config.js` file includes the `@wordpress/scripts` defaults, along with an entry path for `/src/frontend.js`. The frontend entry path is conditionally included and is not a requirement. It can be safely deleted.

---

## Contributing and Support

Your contributions and [support tickets](https://github.com/WebDevStudios/WDS-Blocks/issues) are welcome. Please see our [guidelines](https://github.com/WebDevStudios/WDS-Blocks/blob/main/CONTRIBUTING.md) before submitting a pull request.
