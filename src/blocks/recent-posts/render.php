<?php

/**
 * Server-side rendering of the `wds/recent-posts` block.
 *
 * @package gutenberg
 */

namespace WDS\Gutenberg\blocks\recent_posts;

/**
 * Renders the `wds/recent-posts` block on server.
 *
 * @param array $attributes The block attributes.
 *
 * @return string Returns the post content with recent posts added.
 */
function render_block( $attributes ) {

	$taxonomies   = isset( $attributes['taxonomies'] ) ? json_decode( $attributes['taxonomies'], true ) : array();
	$tags         = isset( $taxonomies['post_tag'] ) ? $taxonomies['post_tag'] : array();
	$categories   = isset( $taxonomies['category'] ) ? $taxonomies['category'] : array();
	$tag_ids      = array();
	$category_ids = array();

	// Get tag ids.
	if ( ! empty( $tags ) ) {
		foreach( $tags as $tag ) {
			$tag_ids[] = $tag['id'];
		}
	}

	// Get category ids.
	if ( ! empty( $categories ) ) {
		foreach( $categories as $category ) {
			$category_ids[] = $category['id'];
		}
	}

	$new_recent_posts = new \WP_Query( array(
		'numberposts'  => $attributes['postsToShow'],
		'post_status'  => 'publish',
		'order'        => $attributes['order'],
		'orderby'      => $attributes['orderby'],
		'tag__in'      => $tag_ids,
		'category__in' => $category_ids,
	) );

	$class = "align{$attributes['align']}";
	if ( isset($attributes['postLayout'] ) && 'grid' === $attributes['postLayout'] ) {
		$class .= ' is-grid';
	}

	if ( isset( $attributes['columns'] ) && 'grid' === $attributes['postLayout'] ) {
		$class .= ' columns-' . $attributes['columns'];
	}

	// Handle a custom CSS class.
	$class_name = 'wp-block-wds-recent-posts ';
	if ( isset( $attributes['className'] ) ) {
		$attributes['className'] = $class_name . $attributes['className'];
	}

	ob_start();
	?>

	<!-- wp:wds/recent-posts -->
	<?php \WDS\Gutenberg\template_tags\block_container_options\display_block_options( $attributes ); ?>

		<?php \WDS\Gutenberg\components\block_title\display_block_title( $attributes );

		if ( $new_recent_posts->have_posts() ) :
			?>

			<div class="recent-block-container-output" tabindex="0">

				<ul <?php post_class( 'selected-posts-container ' . $class ); ?>>

					<?php
					while ( $new_recent_posts->have_posts() ) :
						$new_recent_posts->the_post();
						$post_thumb_id = get_post_thumbnail_id();
						?>
						<li tabindex="0">
							<?php if ( has_post_thumbnail() ) : ?>
								<?php echo wp_get_attachment_image( $post_thumb_id, 'medium_large' ); ?>
							<?php endif; ?>
							<h3 class="h1">
								<a href="<?php the_permalink(); ?>">
									<?php the_title(); ?>
								</a>
							</h3>
							<div class="post-excerpt">
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
	<!-- /wp:wds/recent-posts -->

	<?php
	return ob_get_clean();
}

/**
 * Registers the `wds/recent-posts` block on server.
 */
function register_block() {

	// Required to render output in editor.
	register_block_type('wds/recent-posts', array(
		'attributes' => array(
			'className' => array(
				'type'    => 'string',
				'default' => 'wp-block-wds-recent-posts',
			),
			'taxonomies' => array(
				'type' => 'string',
			),
			'postsToShow' => array(
				'type' => 'number',
				'default' => 5,
			),
			'displayPostDate' => array(
				'type' => 'boolean',
				'default' => false,
			),
			'postLayout' => array(
				'type' => 'string',
				'default' => 'list',
			),
			'columns' => array(
				'type' => 'number',
				'default' => 3,
			),
			'align' => array(
				'type' => 'string',
				'default' => 'center',
			),
			'order' => array(
				'type' => 'string',
				'default' => 'desc',
			),
			'orderby' => array(
				'type' => 'string',
				'default' => 'date',
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
