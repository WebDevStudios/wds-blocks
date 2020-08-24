# WDS Block Starter

[![buddy pipeline](https://app.buddy.works/webdevstudios/wds-block-starter/pipelines/pipeline/240874/badge.svg?token=2471ae60766a1e9a657f772e493188dde748aa18c236d0b1c325e80be13a2ac6 "buddy pipeline")](https://app.buddy.works/webdevstudios/wds-block-starter/pipelines/pipeline/240874)

A Gutenberg block starter for WebDevStudios projects. For more info on the WordPress Block API, check out the [Gutenberg Handbook](https://developer.wordpress.org/block-editor/).

<a href="https://webdevstudios.com/contact/"><img src="https://webdevstudios.com/wp-content/uploads/2018/04/wds-github-banner.png" alt="WebDevStudios. Your Success is Our Mission."></a>

## Requirements

-   [Node LTS](https://nodejs.org/en/)
-   [Composer](https://getcomposer.org/)

_We highly recommend [NVM](https://github.com/nvm-sh/nvm) so you can easily switch between Node versions._

---

## Setup

### Automatic Installation

Easily scaffold a block via CLI:

```bash
npx @webdevstudios/block WebDevStudios/TodoList
cd todo-list
npm run start
```

See [@webdevstudios/create-block](https://github.com/WebDevStudios/create-block) for more information and options.

### Manual Installation

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

Your contributions and [support tickets](https://github.com/WebDevStudios/wds-block-starter/issues) are welcome. Please see our [guidelines](https://github.com/WebDevStudios/wds-block-starter/blob/master/.github/CONTRIBUTING.md) before submitting a pull request.

---

## Changelog

### 1.1.1

-   Fix stylesheet enqueue

### 1.1.0

-   Add support for Prettier
-   Add support for Stylelint
-   Add `block.json`
-   Improve alignment with Gutenberg's use of `@wordpress/scripts`
-   Improve PHP linting via Composer
-   Mention that `webpack.config.js` is optional

### 1.0.0

-   Add support for @wordpress/scripts `12.1.1`
-   Update webpack config
-   Add import statements for SCSS files

### 0.0.1

-   Initial block starter setup.
