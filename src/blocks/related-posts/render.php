<?php

/**
 * Server-side rendering of the `wds/related-posts` block.
 *
 * @package gutenberg
 */

namespace WDS\Gutenberg\blocks\related_posts;

/**
 * Renders the `wds/related-posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with related posts added.
 */
function render_block( $attributes ) {

	// Get ids.
	$post_id_array = json_decode( $attributes['selectedPostsJSON'] );

	// Set a post limit if no posts are manually selected.
	$posts_per_page = $post_id_array ? null : 3;

	$args = array(
		'post_type'      => array( 'post' ),
		'orderby'        => 'post__in',
		'post__in'       => $post_id_array,
		'posts_per_page' => $posts_per_page,
	);

	$attributes['class'] = 'wp-block-wds-related-posts';

	$the_query = new \WP_Query( $args );

	ob_start();
	?>

	<!-- wp:wds/related-posts -->
	<?php \WDS\Gutenberg\template_tags\block_container_options\display_block_options( $attributes ); ?>

		<?php
		\WDS\Gutenberg\components\block_title\display_block_title( $attributes );

		if ( $the_query->have_posts() ) :
		?>

		<div class="related-block-container-output" tabindex="0">

			<ul class="selected-posts-container">

				<?php
					while ( $the_query->have_posts() ) :
						$the_query->the_post();

					$post_thumb_id = get_post_thumbnail_id();
				?>
					<li <?php post_class( 'column' ); ?> tabindex="0">
						<?php if ( has_post_thumbnail() ) : ?>
							<?php echo wp_get_attachment_image( $post_thumb_id, 'medium_large' ); ?>
						<?php endif; ?>
						<h3 class="h1">
							<a href="<?php the_permalink(); ?>">
								<?php the_title(); ?>
							</a>
						</h3>
						<div class="entry-content">
							<?php the_excerpt(); ?>
						</div>
					</li>
				<?php
					endwhile;
					wp_reset_postdata();
				?>
			</ul>
		</div><!-- related-block-container-list -->
		<?php endif; ?>
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
	register_block_type('wds/related-posts', array(
		'attributes' => array(
			'className' => array(
				'type' => 'string',
				'defautlt' => 'wp-block-wds-related-posts',
			),
			'selectedPostsJSON' => array(
				'type' => 'string',
			),
			'selectedPosts' => array(
				'type' => 'array',
				'source' => 'children',
				'selector' => '.related-right-column',
			),
			'blockTitle' => array(
				'type' => 'string'
			),
			'backgroundType' => array(
				'type' => 'string'
			),
			'backgroundImage' => array(
				'type' => 'object'
			),
			'backgroundVideo' => array(
				'type' => 'object'
			),
			'backgroundColor' => array(
				'type' => 'string'
			),
			'animationType' => array(
				'type' => 'string'
			),
			'textColor' => array(
				'type' => 'string'
			),
		),
		'render_callback' => __NAMESPACE__ . '\\render_block',
	));
}

add_action( 'init', __NAMESPACE__ . '\\register_block' );
