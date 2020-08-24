/**
 * Optional Webpack config.
 *
 * This config includes the `@wordpress/scripts` defaults, along with
 * an entry path for `/src/frontend.js`. The frontend entry path is
 * conditionally included and is not a requirement. It is safe to
 * delete this file.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-scripts/#provide-your-own-webpack-config
 */

const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const glob = require( 'glob' );
const IgnoreEmitPlugin = require( 'ignore-emit-webpack-plugin' );
const entry = { ...defaultConfig.entry };

/**
 * If there is a `src/frontend.js`, set it as the entry file.
 */
const frontendScript = glob.sync( './src/frontend.js' );
if ( frontendScript.length ) {
	entry.frontend = frontendScript;
}

/**
 * Compile `src/frontend.js` using @wordpress/scripts.
 */
module.exports = {
	...defaultConfig,
	entry,
	plugins: [
		...defaultConfig.plugins,
		new IgnoreEmitPlugin( [ 'frontend.asset.php' ] ),
	],
};
