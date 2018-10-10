/**
 * BLOCK: Recent Posts
 */

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;

// Styles
import './style.scss';

import RecentPostsBlock from './recent-posts';

/**
 * Register block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
export default registerBlockType( 'wds/recent-posts', { // Namespaced with 'wds/', lowercase, hyphenated.
	// Localize title using wp.i18n.__()
	title: __( 'Recent Posts Block (WDS)' ),

	// Description: Write a quick description.
	description: __( 'A block to display your site\'s most recent posts.' ),

	// Category options: common, formatting, layout, widgets, embed.
	category: 'wds-blocks',

	// Can use a Dashicon (see https://developer.wordpress.org/resource/dashicons/) or an imported SVG.
	icon: 'clock',

	// Limit to 3 keywords/phrases. Users will see your block when they search using these keywords.
	keywords: [
		__( 'Recent Posts' ),
	],
	supports: {
		html: false,
	},

	// Determines what is displayed in the editor.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#edit
	edit: RecentPostsBlock,

	// Determines what is displayed on the front-end.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#save
	//
	// For dynamic blocks, you can return null here and define a render callback function in PHP.
	// https://wordpress.org/gutenberg/handbook/blocks/creating-dynamic-blocks/
	save: () => null,
} );
