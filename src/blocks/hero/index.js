/**
 * BLOCK: Hero Block
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
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	registerBlockType,
	RichText,
} = wp.blocks;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';
import classnames from 'classnames';

// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/background-options';

// Import all of our Text Options requirements.
import TextOptions, { TextOptionsAttributes, TextOptionsInlineStyles } from '../../components/text-options';

// Import all of our Other Options requirements.
import OtherOptions, { OtherOptionsAttributes, OtherOptionsClasses } from '../../components/other-options';

/**
 * Register block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
export default registerBlockType(
	// Namespaced with 'wds', lowercase, hyphenated. Example: 'wds/example-block-name'
	'wds/hero',
	{
		// Localize title using wp.i18n.__()
		title: __( 'WDS Hero Block' ),
		// Description: Write a quick description.
		description: __( 'A full-width hero with a video, image, or color background.' ),
		// Category options: common, formatting, layout, widgets, embed.
		category: 'common',
		// Can use a Dashicon (see https://developer.wordpress.org/resource/dashicons/) or an imported SVG.
		icon: 'format-image',
		// Limit to 3 keywords/phrases. Users will see your block when they search using these keywords.
		keywords: [
			__( 'Hero' ),
			__( 'Background' ),
		],
		// Set for each piece of dynamic data used in your block.
		// https://wordpress.org/gutenberg/handbook/block-api/attributes/
		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.content-block',
			},
			alignment: {
				type: 'string',
			},
			...BackgroundOptionsAttributes,
			...TextOptionsAttributes,
			...OtherOptionsAttributes,
		},
		// Determines what is displayed in the editor.
		// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#edit
		edit: props => {
			// Event handler to update the value of the content when changed in editor.
			const onChangeMessage = value => {
				props.setAttributes( { message: value } );
			};

			// Listen for an alignment change.
			const onChangeAlignment = value => {
				props.setAttributes( { alignment: value } );
			};
			// Return the markup displayed in the editor, including a core Editable field.
			return [
				!! props.isSelected && (
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
					</InspectorControls>
				),
				!! props.isSelected && (
					<BlockControls key="controls">
						<AlignmentToolbar
							value={ props.attributes.alignment }
							onChange={ onChangeAlignment }
						/>
					</BlockControls>
				),
				<section
					key="editable-content-example-block-with-options"
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

					<header className="content-block-header">
						<h2
							style={ {
								color: props.attributes.textColor ? props.attributes.textColor : null,
								textAlign: props.attributes.alignment,
							} }
						>
							{ __( 'WDS Hero Block' ) }
						</h2>
					</header>

					<RichText
						tagName="div"
						multiline="p"
						className="content-block"
						placeholder={ __( 'To customize this block, click on "Show Advanced Settings"' ) }
						onChange={ onChangeMessage }
						value={ props.attributes.message }
						focus={ props.isSelected }
						onFocus={ props.setFocus }
						style={ {
							textAlign: props.attributes.alignment,
						} }
					/>
				</section>,
			];
		},
		// Determines what is displayed on the front-end.
		// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#save
		//
		// For dynamic blocks, you can return null here and define a render callback function in PHP.
		// https://wordpress.org/gutenberg/handbook/blocks/creating-dynamic-blocks/
		save: props => {
			return (
				<section
					className={ classnames(
						props.className,
						...BackgroundOptionsClasses( props ),
						...OtherOptionsClasses( props ),
					) }
					style={ {
						...BackgroundOptionsInlineStyles( props ),
						...TextOptionsInlineStyles( props ),
						textAlign: props.attributes.alignment,
					} }
				>

					{ BackgroundOptionsVideoOutput( props ) }

					<header className="content-block-header">
						<h2>{ __( 'WDS Hero Block' ) }</h2>
					</header>

					<div className="content-block-content content-block">
						{ props.attributes.message }
					</div>

					<footer className="contenet-block-footer">
						<a href="https://www.webdevstudios.com/" className="button">{ __( 'Click Me' ) }</a>
					</footer>
				</section>
			);
		},
	},
);
