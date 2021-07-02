<?php
/**
 * Plugin Name: Vigor Custom Blocks
 * Plugin URI:  https://github.com/WebDevStudios/WDS-Blocks/
 * Description: Vigor library of Gutenberg blocks.
 * Author: Alfredo Navas
 * Author URI: https://elpuas.com
 * Version:     1.0.0
 * License:     GPLv2
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: vigor
 * Domain Path: /languages
 *
 * @package WebDevStudios\Blocks
 * @since 1.0.0
 */

namespace WebDevStudios\Blocks;

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

/**
 * Register the block with WordPress.
 *
 * @author ElPuas
 * @since 2.0.0
 */
function register_block() {

	// Define our assets.
	$editor_script   = 'build/index.js';
	$editor_style    = 'build/index.css';
	$frontend_style  = 'build/style-index.css';
	$frontend_script = 'build/frontend.js';

	// Verify we have an editor script.
	if ( ! file_exists( plugin_dir_path( __FILE__ ) . $editor_script ) ) {
		wp_die( esc_html__( 'Whoops! You need to run `npm run build` for the WDS Block Starter first.', 'vigor' ) );
	}

	// Autoload dependencies and version.
	$asset_file = require plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	// Register editor script.
	wp_register_script(
		'vigor-editor-script',
		plugins_url( $editor_script, __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version'],
		true
	);

	// Register editor style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $editor_style ) ) {
		wp_register_style(
			'vigor-editor-style',
			plugins_url( $editor_style, __FILE__ ),
			[ 'wp-edit-blocks' ],
			filemtime( plugin_dir_path( __FILE__ ) . $editor_style )
		);
	}

	// Register frontend style.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $frontend_style ) ) {
		wp_register_style(
			'vigor-style',
			plugins_url( $frontend_style, __FILE__ ),
			[],
			filemtime( plugin_dir_path( __FILE__ ) . $frontend_style )
		);
	}

	// Register blocks with WordPress.
	register_block_type(
		'vigor/carousel',
		[
			'editor_script' => 'vigor-editor-script',
			'editor_style'  => 'vigor-editor-style',
			'style'         => 'vigor-style',
		]
	);

	register_block_type(
		'vigor/carousel-slide',
		[
			'editor_script' => 'vigor-editor-script',
			'editor_style'  => 'vigor-editor-style',
			'style'         => 'vigor-style',
		]
	);

	// Register frontend script.
	if ( file_exists( plugin_dir_path( __FILE__ ) . $frontend_script ) ) {
		wp_enqueue_script(
			'vigor-frontend-script',
			plugins_url( $frontend_script, __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Adds a WDS Block category to the Gutenberg category list.
 *
 * @author ElPuas
 * @since 2.0.0
 *
 * @param array  $categories The existing categories.
 * @param object $post The current post.
 * @return array The updated array of categories.
 */
function register_block_category( $categories, $post ) {

	return array_merge(
		$categories,
		[
			[
				'slug'  => 'wds-blocks',
				'title' => esc_html__( 'WDS Blocks', 'vigor' ),
			],
		]
	);
}
add_filter( 'block_categories_all', __NAMESPACE__ . '\register_block_category', 10, 2 );
