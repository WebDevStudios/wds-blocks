/**
 * BLOCK: Default Block
 *
 * This block was meant to be duplicated.
 * It serves as the starting point for new blocks. 😀
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const {
	registerBlockType,
	Editable,
} = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register a new block with WordPress.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 */
registerBlockType(
	// Namespaced (wds), hyphens, lowercase, unique name.
	'wds/default',
	{
		// Localize title using wp.i18n.__()
		title: __( 'Default: Duplicate Me' ),
		// Description: Write a quick description.
		description: __( 'Optional description.' ),
		// Category options: common, formatting, layout, widgets, embed.
		category: 'common',
		// Dashicons options - https://developer.wordpress.org/resource/dashicons/
		icon: 'sos',
		// Limit to 3 keywords/phrases.
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
			const onChangeContent = value => {
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
						onChange={ onChangeContent }
					/>
				</div>
			);
		},
		// Determines what is displayed on the front-end.
		// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#save
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
