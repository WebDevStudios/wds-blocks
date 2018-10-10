<?php
/**
 * Plugin Name: WDS Blocks
 * Plugin URI:  https://github.com/WebDevStudios/WDS-Blocks
 * Description: WebDevStudios library of Gutenberg blocks.
 * Author:      WebDevStudios
 * Author URI:  https://webdevstudios.com/
 * Version:     1.0.7
 * License:     GPL3+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 */

namespace WDS\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * If Gutenberg is not active, display an admin error message
 * and deactivate this plugin.
 */
function require_gutenberg() {
	?>
	<div class="error"><p><?php esc_html_e( 'WDS Blocks requires that the WordPress Gutenberg plugin is activated.', 'wds-blocks' ); ?></p></div>
	<?php

	deactivate_plugins( plugin_basename( __FILE__ ) );
}

/**
 * Initializes plugin on plugins_loaded to
 * properly call function_exists.
 */
function init_gutenberg() {

	// @todo: When Gutenberg is rolled into WP core, change this to
	// a version_compare() and update the error message.
	if ( ! function_exists( 'register_block_type' ) ) {
		add_action( 'admin_notices', __NAMESPACE__ . '\\require_gutenberg' );
		return;
	}

	/**
	 * Initialize plugin.
	 */
	require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

}
add_action( 'plugins_loaded', __NAMESPACE__ . '\\init_gutenberg' );
