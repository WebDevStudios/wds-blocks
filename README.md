# WDS Blocks

A library of Gutenberg blocks.

[![WebDevStudios. Your Success is Our Mission.](https://webdevstudios.com/wp-content/uploads/2018/04/wds-github-banner.png)](https://webdevstudios.com/contact/)

---

## Available Blocks

-   Accordion
-   Carousel

---

## Quick Start

1. Download a pre-built version of the [latest release](https://github.com/WebDevStudios/wds-blocks/releases/download/2.2.0/WDS-Blocks.zip)
2. Extract `WDS-Blocks.zip` into your project's `/plugins` directory
3. Activate the plugin in the WordPress Dashboard

---

## Development

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

## Scripts

Watch for changes:

```bash
npm run start
```

Build a production version:

```bash
npm run build
```

### Other handy commands

Lint everything:

```bash
npm run lint
```

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
npm run lint:php
```

### Webpack Config (optional)

The optional `webpack.config.js` file includes the `@wordpress/scripts` defaults, along with an entry path for `/src/frontend.js`. The frontend entry path is conditionally included and is not a requirement. It can be safely deleted.

---

## Contributing and Support

Your contributions and [support tickets](https://github.com/WebDevStudios/WDS-Blocks/issues) are welcome. Please see our [guidelines](https://github.com/WebDevStudios/WDS-Blocks/blob/master/.github/CONTRIBUTING.md) before submitting a pull request.
