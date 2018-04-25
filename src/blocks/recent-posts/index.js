/**
 * BLOCK: Recent Posts
 */

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	registerBlockType
} = wp.blocks;

// Styles
import './style.scss';

// Import our components.
import { BlockTitleAttributes } from '../../components/block-title';

// Import all of our Background Options requirements.
import { BackgroundOptionsAttributes } from '../../components/background-options';

// Import all of our Text Options requirements.
import { TextOptionsAttributes } from '../../components/text-options';

// Import all of our Other Options requirements.
import { OtherOptionsAttributes } from '../../components/other-options';

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
	title: __( 'WDS Recent Posts' ),

	// Description: Write a quick description.
	description: __( 'Shows a list of your site\'s most recent posts.' ),

	// Category options: common, formatting, layout, widgets, embed.
	category: 'widgets',

	// Can use a Dashicon (see https://developer.wordpress.org/resource/dashicons/) or an imported SVG.
	icon: 'clock',

	// Limit to 3 keywords/phrases. Users will see your block when they search using these keywords.
	keywords: [
		__( 'recent posts' )
	],
	attributes: {
		displayPostDate: {
			type: 'boolean',
			default: false
		},
		taxonomies: {
			type: 'string',
			default: ''
		},
		postsToShow: {
			type: 'number',
			default: 5
		},
		postLayout: {
			type: 'string',
			default: 'list'
		},
		columns: {
			type: 'number',
			default: 3
		},
		order: {
			type: 'string'
		},
		orderby: {
			type: 'string'
		},
		...BlockTitleAttributes,
		...BackgroundOptionsAttributes,
		...TextOptionsAttributes,
		...OtherOptionsAttributes
	},
	supports: {
		html: false
	},

	// Determines what is displayed in the editor.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#edit
	edit: RecentPostsBlock,

	// Determines what is displayed on the front-end.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#save
	//
	// For dynamic blocks, you can return null here and define a render callback function in PHP.
	// https://wordpress.org/gutenberg/handbook/blocks/creating-dynamic-blocks/
	save: () => null
} );
