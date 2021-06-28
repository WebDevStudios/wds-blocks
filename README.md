# WDS Blocks

[![buddy pipeline](https://app.buddy.works/webdevstudios/wds-blocks/pipelines/pipeline/145265/badge.svg?token=2471ae60766a1e9a657f772e493188dde748aa18c236d0b1c325e80be13a2ac6 "buddy pipeline")](https://app.buddy.works/webdevstudios/wds-blocks/pipelines/pipeline/145265)

A library of Gutenberg blocks.

[![WebDevStudios. Your Success is Our Mission.](https://webdevstudios.com/wp-content/uploads/2018/04/wds-github-banner.png)](https://webdevstudios.com/contact/)

---

## Available Blocks

-   Accordion
-   Carousel

---

## Requirements 📝

-   [Node 14](https://nodejs.org/en/)
-   [Composer](https://getcomposer.org/)
-   [WordPress 5.0+](https://wordpress.org)

---

## Installation 🚀

Clone the repo with Git:

```bash
git clone git@github.com:WebDevStudios/wds-blocks.git
```

Install dependencies:

```bash
npm i --legacy-peer-deps
```

---

## 💻 Development

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
