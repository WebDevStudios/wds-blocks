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
	// InspectorControls,
	registerBlockType,
} = wp.blocks;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import classnames from 'classnames';

/**
 * Import editor class.
 */
import EditComponent from './edit.js';

// Import our components.
import { BlockTitleAttributes, BlockTitleOutput } from '../../components/block-title';
import PostOutput from './post';

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
	title: __( 'WDS Related Posts' ),
	// Description: Write a quick description.
	description: __( 'A related posts block.' ),
	// Category options: common, formatting, layout, widgets, embed.
	category: 'common',
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
		selectedPostsJSON: { // json array of objects
			type: 'string',
		},
		selectedPosts: { // markup
			type: 'array',
			source: 'children',
			selector: '.related-right-column',
		},
		...BlockTitleAttributes,
	},
	// Determines what is displayed in the editor.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#edit
	edit: EditComponent,
	// Determines what is displayed on the front-end.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#save
	//
	// For dynamic blocks, you can return null here and define a render callback function in PHP.
	// https://wordpress.org/gutenberg/handbook/blocks/creating-dynamic-blocks/
	save: ( props ) => {
		return (
			<section>
				<BlockTitleOutput
					key="related-block-title-output"
					{ ...props }
				/>
				<div key="related-block-container-output" className={ classnames( props.className ) }>
					<ul>
						<PostOutput
							{ ...props }
						/>
					</ul>
				</div>
			</section>
		);
	},
	// deprecated: [
	// 	{
	// 		attributes: {

	// 		},
	// 		save( props ) {
	// 			return (

	// 			);
	// 		}
	// 	}
	// ]
} );
