<?php
/**
 * Plugin Name: WDS Gutenberg
 * Plugin URI:  https://github.com/WebDevStudios/WDS-Gutenberg
 * Description: Gutenberg blocks for webdvstudios.com
 * Author:      WebDevStudios
 * Author URI:  https://webdevstudios.com/
 * Version:     1.0.0
 * License:     GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.html
 */

namespace WDS\Gutenberg;

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
	<div class="error"><p><?php esc_html_e( 'WDS Gutenberg requires that the Gutenberg plugin is activated.', 'wds-gutenberg' ); ?></p></div>
	<?php

	deactivate_plugins( [ 'wds-gutenberg/wds-gutenberg.php' ] );
}

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
