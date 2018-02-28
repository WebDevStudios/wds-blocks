/**
 * BLOCK: Default Block
 *
 * This block was meant to be duplicated.
 * It serves as the starting point for new blocks. 😀
 */

/**
 * External dependencies
 */
// Import NPM libraries here. Example:
// import npmPackage from 'npmpackage';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	registerBlockType,
	Editable,
} = wp.blocks; // Import registerBlockType() and Editable() from wp.blocks

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
// Import all JS and SCSS files for this block, and any
// components from the '../../components/' directory.

/**
 * Register block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType(
	// Namespaced with 'wds', lowercase, hyphenated. Example: 'wds/example-block-name'
	'wds/default',
	{
		// Localize title using wp.i18n.__()
		title: __( 'Default: Duplicate Me' ),
		// Description: Write a quick description.
		description: __( 'Optional description.' ),
		// Category options: common, formatting, layout, widgets, embed.
		category: 'common',
		// Can use a Dashicon (see https://developer.wordpress.org/resource/dashicons/) or an imported SVG.
		icon: 'sos',
		// Limit to 3 keywords/phrases. Users will see your block when they search using these keywords.
		keywords: [
			__( 'keyword 1' ),
			__( 'keyword 2' ),
			__( 'keyword 3' ),
		],
		// Set for each piece of dynamic data used in your block.
		// https://wordpress.org/gutenberg/handbook/block-api/attributes/
		attributes: {
			content: {
				type: 'array',
				source: 'children',
				selector: 'div.default-block',
			},
		},
		// Determines what is displayed in the editor.
		// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#edit
		edit: props => {
			// Event handler to update the value of the content when changed in editor.
			const setContentAttribute = value => {
				props.setAttributes( { content: value } );
			};
			// Return the markup displayed in the editor, including a core Editable field.
			return (
				<div className={ props.className }>
					<Editable
						tagname="div"
						multiline="p"
						className="default-block"
						placeholder={ __( 'Lorem to my Ipsum...' ) }
						value={ props.attributes.content }
						onChange={ setContentAttribute }
					/>
				</div>
			);
		},
		// Determines what is displayed on the front-end.
		// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#save
		//
		// For dynamic blocks, you can return null here and define a render callback function in PHP.
		// https://wordpress.org/gutenberg/handbook/blocks/creating-dynamic-blocks/
		save: props => {
			return (
				<div className={ props.className }>
					<div className="default-block">
						{ props.attributes.content }
					</div>
				</div>
			);
		},
	}
);
