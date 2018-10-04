/**
 * BLOCK: Default Block
 *
 * This block was meant to be duplicated.
 * It serves as the starting point for new blocks. 😀
 */

/**
 * External dependencies
 */
import classnames from 'classnames'; // Import NPM libraries here.

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
	RichText,
} = wp.editor;

/**
 * Internal dependencies
 */

// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/background-options';

// Import all of our Text Options requirements.
import TextOptions, { TextOptionsAttributes, TextOptionsInlineStyles, TextOptionsClasses } from '../../components/text-options';

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
export default registerBlockType( 'wds/default', { // Namespaced with 'wds/', lowercase, hyphenated.
	// Localize title using wp.i18n.__()
	title: __( 'Default Block: Duplicate Me (WDS)' ),
	// Description: Write a quick description.
	description: __( 'Optional description.' ),
	// Category options: common, formatting, layout, widgets, embed.
	category: 'wds-blocks',
	// Can use a Dashicon (see https://developer.wordpress.org/resource/dashicons/) or an imported SVG.
	icon: 'sos',
	// Limit to 3 keywords/phrases. Users will see your block when they search using these keywords.
	keywords: [
		__( 'Options' ),
		__( 'Editable' ),
		__( 'Multiline' ),
	],
	// Set for each piece of dynamic data used in your block.
	// https://wordpress.org/gutenberg/handbook/block-api/attributes/
	attributes: {
		message: {
			type: 'array',
			source: 'children',
			selector: '.content-block',
		},
		...BackgroundOptionsAttributes,
		...TextOptionsAttributes,
		...OtherOptionsAttributes,
	},
	// Determines what is displayed in the editor.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#edit
	edit: props => {
		// Event handler to update the value of the content when changed in editor.
		const setMessageAttribute = value => {
			props.setAttributes( { message: value } );
		};
		// Return the markup displayed in the editor, including a core Editable field.
		return [
			!! props.isSelected && (
				<InspectorControls key="inspector">
					{ BackgroundOptions( props ) }
					{ TextOptions( props ) }
					{ OtherOptions( props ) }
				</InspectorControls>
			),
			<section
				key="editable-content-example-block-with-options"
				className={ classnames(
					props.className,
					...BackgroundOptionsClasses( props ),
					...OtherOptionsClasses( props ),
					...TextOptionsClasses( props ),
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
						} }
					>
						{ __( 'WDS Default Block' ) }
					</h2>
				</header>

				<RichText
					tagName="div"
					multiline="p"
					className="content-block"
					placeholder={ __( 'To customize this block, click on "Show Advanced Settings"' ) }
					onChange={ setMessageAttribute }
					value={ props.attributes.message }
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
				} }
			>

				{ BackgroundOptionsVideoOutput( props ) }

				<header className="content-block-header">
					<h2>{ __( 'WDS Example Block with Options' ) }</h2>
				</header>

				<div className="content-block-content content-block">
					{ props.attributes.message }
				</div>
			</section>
		);
	},
	deprecated: [
		{
			attributes: {
				message: {
					type: 'array',
					source: 'children',
					selector: '.content-block',
				},
				...BackgroundOptionsAttributes,
				...TextOptionsAttributes,
				...OtherOptionsAttributes,
			},
			save( props ) {
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
						} }
					>

						{ BackgroundOptionsVideoOutput( props ) }

						<header className="content-block-header">
							<h2>{ __( 'WDS Example Block with Options' ) }</h2>
						</header>

						<div className="content-block-content content-block">
							{ props.attributes.message }
						</div>
					</section>
				);
			},
		},
	],
} );
