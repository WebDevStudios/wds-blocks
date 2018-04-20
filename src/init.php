<?php
/**
 * Initialize plugin.
 *
 * @since 1.0.0
 */

namespace WDS\Gutenberg;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend & backend.
 *
 * `wp-blocks`: Includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function enqueue_block_assets() {
	wp_enqueue_style(
		'wds-gutenberg-css',
		plugins_url( 'dist/blocks.style.build.css', __DIR__ ),
		[ 'wp-blocks' ], // Dependencies, defined above.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);
}
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\enqueue_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`:  Includes block type registration and related functions.
 * `wp-element`: Includes the WordPress Element abstraction for describing the structure of blocks.
 * `wp-i18n`:    To internationalize the block's text.
 *
 * @since 1.0.0
 */
function enqueue_block_editor_assets() {
	wp_enqueue_script(
		'wds-gutenberg-editor-js',
		plugins_url( 'dist/blocks.build.js', __DIR__ ),
		[ 'wp-blocks', 'wp-i18n', 'wp-element' ], // Dependencies, defined above.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' )
	);

	wp_enqueue_style(
		'wds-gutenberg-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', __DIR__ ),
		[ 'wp-edit-blocks' ],
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );

// Recursively load all PHP files within the /src/ directory.
require_once plugin_dir_path( __DIR__ ) . 'vendor/autoload/autoload.php';
\AaronHolbrook\Autoload\autoload( plugin_dir_path( __DIR__ ) . 'src' );
