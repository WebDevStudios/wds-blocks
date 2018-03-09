<?php
/**
 * Displays the Call to Action block.
 *
 * @package WDS_Gutenberg
 * @since NEXT
 */

namespace WDS_Gutenberg\Src\Call_To_Action;

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

		<?php \WDS_Gutenberg\Src\Component\display_block_title( $attributes ); ?>

	</section>
	<!-- /wp:wds/related-posts -->
	<?php

	return ob_get_clean();
}
register_block_type( 'wds/call-to-action', [ 'render_callback' => __NAMESPACE__ . '\\render_block' ] );
