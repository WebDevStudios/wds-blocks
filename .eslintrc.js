module.exports = {
	extends: [
		'plugin:@wordpress/eslint-plugin/recommended',
		'plugin:eslint-comments/recommended',
	],
	parserOptions: {
		ecmaVersion: 2021,
		requireConfigFile: false,
		babelOptions: {
			presets: [ require.resolve( '@wordpress/babel-preset-default' ) ],
		},
	},
	root: true,
	env: {
		browser: true,
		es6: true,
		jquery: true,
	},
	rules: {
		camelcase: 1,
	},
};
