/**
 * BLOCK: Related Posts
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
const { __ } = wp.i18n;
const {
	InspectorControls,
	registerBlockType,
} = wp.blocks;
const {
	withAPIData,
} = wp.components;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import classnames from 'classnames';

// Import our Block Title component.
import BlockTitle, { BlockTitleAttributes } from '../../components/block-title';

// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/background-options';

// Import all of our Text Options requirements.
import TextOptions, { TextOptionsAttributes, TextOptionsInlineStyles } from '../../components/text-options';

// Import all of our Other Options requirements.
import OtherOptions, { OtherOptionsAttributes, OtherOptionsClasses } from '../../components/other-options';

// Import our Post Search component.
import PostSearch, { PostSearchAttributes } from '../../components/post-search';

/**
 * Register block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
export default registerBlockType( 'wds/related-posts', { // Namespaced with 'wds', lowercase, hyphenated. Example: 'wds/example-block-name'
	// Localize title using wp.i18n.__()
	title: __( 'WDS Related Posts' ),
	// Description: Write a quick description.
	description: __( 'Optional description.' ),
	// Category options: common, formatting, layout, widgets, embed.
	category: 'common',
	// Can use a Dashicon (see https://developer.wordpress.org/resource/dashicons/) or an imported SVG.
	icon: 'format-aside',
	// Limit to 3 keywords/phrases. Users will see your block when they search using these keywords.
	keywords: [
		__( 'Options' ),
		__( 'Related Posts' ),
	],
	// Set for each piece of dynamic data used in your block.
	// https://wordpress.org/gutenberg/handbook/block-api/attributes/
	attributes: {
		...BlockTitleAttributes,
		...BackgroundOptionsAttributes,
		...TextOptionsAttributes,
		...OtherOptionsAttributes,
		...PostSearchAttributes,
	},
	// Determines what is displayed in the editor.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#edit
	edit: props => {
		return [
			!! props.focus && (
				<InspectorControls key="inspector">
					<BackgroundOptions
						{ ...props }
					/>
					<TextOptions
						{ ...props }
					/>
					<OtherOptions
						{ ...props }
					/>
					<PostSearch
						{ ...props }
					/>
				</InspectorControls>
			),
			<section
				key={ props.className }
				className={ classnames(
					props.className,
					...BackgroundOptionsClasses( props ),
					...OtherOptionsClasses( props ),
				) }
				style={ {
					...BackgroundOptionsInlineStyles( props ),
					...TextOptionsInlineStyles( props ),
				} }
			>

				{ BackgroundOptionsVideoOutput( props ) }

				<BlockTitle
					{ ...props }
				/>
			</section>,
		];
	},
	// Determines what is displayed on the front-end.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#save
	//
	// For dynamic blocks, you can return null here and define a render callback function in PHP.
	// https://wordpress.org/gutenberg/handbook/blocks/creating-dynamic-blocks/
	save: () => null,
} );
