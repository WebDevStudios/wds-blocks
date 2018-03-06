<?php
/**
 * Displays the Related Posts block.
 *
 * @package WDS_Gutenberg
 * @since NEXT
 */

namespace WDS_Gutenberg\Src\Related_Posts;

/**
 * Render block: Related Posts.
 *
 * @param array $attributes The attributes passed in from the Related Post block settings.
 * @return string The block markup.
 *
 * @since NEXT
 */
function render_block( $attributes ) {

	ob_start(); ?>

	<!-- wp:wds/related-posts -->
	<?php \WDS_Gutenberg\Src\Block_Options\display_block_options( $attributes ); ?>
		oh yeah okay
	</section>
	<!-- /wp:wds/related-posts -->
	<?php

	return ob_get_clean();
}
register_block_type( 'wds/related-posts', [ 'render_callback' => __NAMESPACE__ . '\\render_block' ] );
