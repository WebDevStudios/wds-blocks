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

	var_dump($attributes);

	$recent_posts = wp_get_recent_posts(array(
		'numberposts' => $attributes['postsToShow'],
		'post_status' => 'publish',
		'order' => $attributes['order'],
		'orderby' => $attributes['orderBy'],
		'category' => $attributes['categories'],
	));

	$list_items_markup = '';

	foreach ($recent_posts as $post) {
		$post_id = $post['ID'];

		$title = get_the_title($post_id);
		if (!$title) {
			$title = __('(Untitled)', 'gutenberg');
		}
		$list_items_markup .= sprintf(
			'<li><a href="%1$s">%2$s</a>',
			esc_url(get_permalink($post_id)),
			esc_html($title)
		);

		if (isset($attributes['displayPostDate']) && $attributes['displayPostDate']) {
			$list_items_markup .= sprintf(
				'<time datetime="%1$s" class="wp-block-recent-posts__post-date">%2$s</time>',
				esc_attr(get_the_date('c', $post_id)),
				esc_html(get_the_date('', $post_id))
			);
		}

		$list_items_markup .= "</li>\n";
	}

	$class = "wp-block-recent-posts align{$attributes['align']}";
	if (isset($attributes['postLayout']) && 'grid' === $attributes['postLayout']) {
		$class .= ' is-grid';
	}

	if (isset($attributes['columns']) && 'grid' === $attributes['postLayout']) {
		$class .= ' columns-' . $attributes['columns'];
	}

	$block_content = sprintf(
		'<ul class="%1$s">%2$s</ul>',
		esc_attr($class),
		$list_items_markup
	);

	return $block_content;
}

/**
 * Registers the `wds/recent-posts` block on server.
 */
function register_block() {

	register_block_type('wds/recent-posts', array(
		'attributes' => array(
			'categories' => array(
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
			'orderBy' => array(
				'type' => 'string',
				'default' => 'date',
			),
		),
		'render_callback' => __NAMESPACE__ . '\\render_block',
	));
}

add_action( 'init', __NAMESPACE__ . '\\register_block' );
