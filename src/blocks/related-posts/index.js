/**
 * BLOCK: Related Posts Block
 *
 * This block was meant to be duplicated.
 * It serves as the starting point for new blocks. 😀
 */

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

/**
 * Import editor class.
 */
import SearchEditComponent from '../../components/search-edit-component';

// Import our components.
import { BlockTitleAttributes } from '../../components/block-title';

// Import all of our Background Options requirements.
import { BackgroundOptionsAttributes } from '../../components/background-options';

// Import all of our Text Options requirements.
import { TextOptionsAttributes } from '../../components/text-options';

// Import all of our Other Options requirements.
import { OtherOptionsAttributes } from '../../components/other-options';

/**
 * Register block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
export default registerBlockType( 'wds/related-posts', { // Namespaced with 'wds/', lowercase, hyphenated.
	// Localize title using wp.i18n.__()
	title: __( 'Related Posts Block (WDS)' ),
	// Description: Write a quick description.
	description: __( 'A block to display manually selected related posts.' ),
	// Category options: common, formatting, layout, widgets, embed.
	category: 'wds-blocks',
	// Can use a Dashicon (see https://developer.wordpress.org/resource/dashicons/) or an imported SVG.
	icon: 'admin-post',
	// Limit to 3 keywords/phrases. Users will see your block when they search using these keywords.
	keywords: [
		__( 'Related' ),
		__( 'Posts' ),
		__( 'Dynamic' ),
	],
	// Set for each piece of dynamic data used in your block.
	// https://wordpress.org/gutenberg/handbook/block-api/attributes/
	attributes: {
		selectedResultsJSON: { // json array of objects
			type: 'string',
		},
		selectedResults: { // markup
			type: 'array',
			source: 'children',
			selector: '.search-right-column',
		},
		queryFor: {
			type: 'string',
			default: 'posts',
		},
		...BlockTitleAttributes,
		...BackgroundOptionsAttributes,
		...TextOptionsAttributes,
		...OtherOptionsAttributes,
	},
	// Determines what is displayed in the editor.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#edit
	edit: SearchEditComponent,
	// Determines what is displayed on the front-end.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#save
	//
	// For dynamic blocks, you can return null here and define a render callback function in PHP.
	// https://wordpress.org/gutenberg/handbook/blocks/creating-dynamic-blocks/
	save: () => null,
} );
