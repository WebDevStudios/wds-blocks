<?php
/**
 * Helper functions for rendering the excerpt.
 *
 * @package WDS_Blocks
 */

namespace WDS\Blocks\template_tags\block_helpers;

/**
 * Returns excerpt with fallbacks.
 *
 * @param  object $post post object.
 *
 * @author jomurgel
 *
 * @since NEXT
 */
function block_get_excerpt( $post ) {

	// Bail if we have no post data.
	if ( empty( $post ) && ! is_object( $post ) ) {
		return;
	}

	// Set empty excerpt.
	$excerpt = '';

	// Get post excerpt.
	$post_excerpt = $post->post_excerpt;

	// Get post content.
	$post_content = $post->post_content;

	// Set length
	$length = 300;

	// URL regex.
	$regex = '/\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|$!:,.;]*[A-Z0-9+&@#\/%=~_|$]/i';

	// Strip shortcodes.
	$strip_shortcodes = strip_shortcodes( $post_content );

	// Strip all tags — remove Gutenberg comments.
	$strip_tags = strip_tags( $strip_shortcodes );

	// Remove all urls from post content.
	$strip_url = preg_replace( $regex, '', $strip_tags );

	// Trim.
	$the_excerpt = substr( $strip_url, 0, $length );

	// Make sure we have an excerpt before returning the excerpt.
	// Otherwise use our default excerpt built from our content.
	if ( ! empty( $post_excerpt ) ) :
		$excerpt = $post_excerpt;
	elseif ( ! empty( $post_content ) && empty( $post_excerpt ) ) :
		$excerpt = esc_html( $the_excerpt );
	endif;

	return esc_html( $excerpt );
}
