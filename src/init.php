<?php
/**
 * Initialize plugin.
 *
 * @since 1.0.0
 */

namespace WDS\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue WDS Blocks block assets for both frontend & backend.
 *
 * `wp-blocks`: Includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function enqueue_block_assets() {
	wp_enqueue_style(
		'wds-blocks-css',
		plugins_url( 'dist/blocks.style.build.css', __DIR__ ),
		[ 'wp-blocks' ], // Dependencies, defined above.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);
}
add_action( 'enqueue_block_assets', __NAMESPACE__ . '\\enqueue_block_assets' );

/**
 * Enqueue WDS Blocks block assets for backend editor.
 *
 * `wp-blocks`:  Includes block type registration and related functions.
 * `wp-element`: Includes the WordPress Element abstraction for describing the structure of blocks.
 * `wp-i18n`:    To internationalize the block's text.
 *
 * @since 1.0.0
 */
function enqueue_block_editor_assets() {
	wp_enqueue_script(
		'wds-blocks-editor-js',
		plugins_url( 'dist/blocks.build.js', __DIR__ ),
		[ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor' ], // Dependencies, defined above.
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' )
	);

	wp_enqueue_style(
		'wds-blocks-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', __DIR__ ),
		[ 'wp-edit-blocks' ],
		filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);
}
add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_block_editor_assets' );

// Recursively load all PHP files within the /src/ directory.
require_once plugin_dir_path( __DIR__ ) . 'vendor/autoload/autoload.php';
\AaronHolbrook\Autoload\autoload( plugin_dir_path( __DIR__ ) . 'src' );

/**
 * Adds custom category for use in block
 *
 * @url https://wordpress.org/gutenberg/handbook/extensibility/extending-blocks/#managing-block-categories
 *
 * @param [array]  $categories block categories.
 * @param [string] $post post type.
 * @return void updated array of $categories.
 */
function add_block_categories( $categories, $post ) {

	// Otherwise update list of categories.
	return array_merge(
		$categories,
		array(
			array(
				'slug'  => 'wds-blocks',
				'title' => __( 'WDS Blocks', 'wds-blocks' ),
			),
		)
	);
}
add_filter( 'block_categories', __NAMESPACE__ . '\\add_block_categories', 10, 2 );

