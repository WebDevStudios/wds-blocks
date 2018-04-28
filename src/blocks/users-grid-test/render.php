<?php

/**
 * Server-side rendering of the `wds/related-posts` block.
 *
 * @package gutenberg
 */

namespace WDS\Gutenberg\blocks\users_grid_test;

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
		'include' => $post_id_array,
		'orderby' => 'include',
	);

	$attributes['class'] = 'wp-block-wds-users-grid-test';

	$users = get_users( $args );

	ob_start();
	?>

	<!-- wp:wds/related-posts -->
	<?php \WDS\Gutenberg\template_tags\block_container_options\display_block_options( $attributes ); ?>

		<?php \WDS\Gutenberg\components\block_title\display_block_title( $attributes ); ?>

		<div class="related-block-container-output" tabindex="0">

			<ul class="selected-posts-container">

				<?php
					foreach( $users as $user ) {
						echo '<li>';
						echo get_avatar( $user->ID, 96 );
						echo '<h3>' . esc_html( $user->display_name ) . '</h3>';
						echo get_the_author_meta( 'description', $user->ID ) ? wpautop( esc_html( get_the_author_meta( 'description', $user->ID ) ) ) : '';
						echo '</li>';
					}
				?>
			</ul>
		</div><!-- related-block-container-list -->
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
	register_block_type('wds/users-grid-test', array(
		'attributes' => array(
			'className' => array(
				'type' => 'string',
				'defautlt' => 'wp-block-wds-users-grid-test',
			),
			'selectedResultsJSON' => array(
				'type' => 'string',
			),
			'selectedResults' => array(
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
