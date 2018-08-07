<?php

/**
 * Server-side rendering of the `wds/related-posts` block.
 *
 * @package WDS_Blocks
 */

namespace WDS\Blocks\block\related_posts;

/**
 * Renders the `wds/related-posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with related posts added.
 */
function render_block( $attributes ) {

	// Get ids.
	$post_id_array = json_decode( $attributes['selectedResultsJSON'] );

	// Set a post limit if no posts are manually selected.
	$posts_per_page = $post_id_array ? null : 3;

	$args = array(
		'post_type'      => array( 'post' ),
		'orderby'        => 'post__in',
		'include'        => $post_id_array,
		'numberposts'    => $posts_per_page,
	);

	$attributes['class'] = 'wp-block-wds-related-posts wds-search-component-container';

	$related_posts = get_posts( $args );

	ob_start();
	?>

	<!-- wp:wds/related-posts -->
	<?php \WDS\Blocks\template_tags\block_container_options\display_block_options( $attributes ); ?>

		<?php \WDS\Blocks\components\block_title\display_block_title( $attributes ); ?>

		<ul class="search-selected-container">

			<?php
			foreach ( $related_posts as $related ) :
				$post_id = $related->ID;

				// Get post thumbnail id.
				$post_thumb_id = get_post_thumbnail_id( $post_id );
				?>
				<li <?php post_class( 'column' ); ?> tabindex="0">

					<?php if ( has_post_thumbnail( $related ) ) : ?>
						<?php echo wp_get_attachment_image( $post_thumb_id, 'medium_large' ); ?>
					<?php endif; ?>

					<h3 class="h1">
						<a href="<?php echo get_the_permalink( $post_id ); ?>">
							<?php echo get_the_title( $post_id ); ?>
						</a>
					</h3>

					<div class="entry-content">
						<?php echo \WDS\Blocks\template_tags\block_helpers\block_get_excerpt( $related ); ?>
					</div>
				</li>
			<?php endforeach; ?>
		</ul>
	</section>
	<!-- /wp:wds/related-posts -->

	<?php
	return ob_get_clean();
}

/**
 * Registers the `wds/related-posts` block on server.
 */
function register_block() {

	// Required to render output in editor.
	register_block_type( 'wds/related-posts', array(
		'attributes'      => array(
			'className'           => array(
				'type'     => 'string',
				'defautlt' => 'wp-block-wds-related-posts',
			),
			'selectedResultsJSON' => array(
				'type' => 'string',
			),
			'selectedResults'     => array(
				'type'     => 'array',
				'source'   => 'children',
				'selector' => '.search-right-column',
			),
			'queryFor'            => array(
				'type'    => 'string',
				'default' => 'posts',
			),
			'blockTitle'          => array(
				'type' => 'string',
			),
			'backgroundType'      => array(
				'type' => 'string',
			),
			'backgroundImage'     => array(
				'type' => 'object',
			),
			'backgroundVideo'     => array(
				'type' => 'object',
			),
			'backgroundColor'     => array(
				'type' => 'string',
			),
			'animationType'       => array(
				'type' => 'string',
			),
			'textColor'           => array(
				'type' => 'string',
			),
		),
		'render_callback' => __NAMESPACE__ . '\\render_block',
	));
}

add_action( 'init', __NAMESPACE__ . '\\register_block' );
