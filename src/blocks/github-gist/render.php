<?php

namespace WDS\Gutenberg\blocks\github_gist;

/**
 * Render block: GitHub Gist.
 * 
 * @return string The block markup.
 */
function render_block( $attributes ) {

  if ( empty( $attributes['url'] ) ) {
    return '';
  }

  if ( is_feed() ) {
    return get_noscript_link_markup( $attributes['url'] );
  }

  ob_start();

  ?>
  <!-- wp:wds/gihub-gist -->
  <div class="wp-block-wds-gihub-gist">
    <script src="<?php echo esc_url( get_script_tag_url( $attributes['url'] ) ); ?>"></script>
    <noscript><?php echo get_noscript_link_markup( $attributes['url'] ); ?></noscript>
  </div>
  <!-- /wp:wds/gihub-gist -->
  <?php

  return ob_get_clean();
}
register_block_type( 'wds/gihub-gist', [ 'render_callback' => __NAMESPACE__ . '\\render_block' ] );

/**
 * Get the noscript link markup.
 *
 * @param string $url The URL.
 */
function get_noscript_link_markup( $url ) {
  return sprintf( '<a href="%1$s">%2$s</a>.', esc_url( $url ), esc_html__( 'View code on GitHub', 'wds-gutenberg' ) );
}

/**
 * Get the gist script tag src URL.
 *
 * @param string $url The URL.
 */
function get_script_tag_url( $url ) {
  return untrailingslashit( $url ) . '.js';
}
