<?php
/**
 * Helper function for displaying the block title.
 *
 * @package WDS_Gutenberg
 * @since NEXT
 */

namespace WDS\Gutenberg\components\block_title;

/**
 * Displays the Block Title for the section.
 *
 * @param  object $attributes Object containing our $attribute values.
 * @return empty              Return nothing if there is no title.
 *
 * @author Corey Collins
 *
 * @since NEXT
 */
function display_block_title( $attributes ) {
	if ( ! $attributes['blockTitle'] ) {
		return;
	}

	?>
	<header className="content-block-header">
		<h2><?php echo esc_html( $attributes['blockTitle'] ); ?></h2>
	</header>
	<?php
}
