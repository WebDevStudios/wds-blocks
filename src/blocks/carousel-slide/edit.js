import {
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import './editor.scss';

// Set up props for InnerBlocks component.
const innerBlocksProps = {
	allowedBlocks: [ 'core/heading', 'core/paragraph', 'core/buttons' ],
	template: [
		[
			'core/heading',
			{
				placeholder: __( 'Slide Title', 'wdsblocks' ),
				level: '4',
				align: 'center',
			},
		],
		[
			'core/paragraph',
			{
				placeholder: __( 'Slide Content', 'wdsblocks' ),
				align: 'center',
			},
		],
		[
			'core/buttons',
			{ align: 'center' },
			[ [ 'core/button', { text: __( 'Read More', 'wdsblocks' ) } ] ],
		],
	],
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @author WebDevStudios
 * @since  2.0.0
 * @see    https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param  {Object} [props] Properties passed from the editor.
 * @return {WPElement}      Element to render.
 */
export default function Edit( props ) {
	const {
		attributes: { fontColor },
		className,
		setAttributes,
	} = props;

	// Update field content on change.
	const onChangeAttributes = ( attribute, value ) => {
		setAttributes( { [ attribute ]: value } );
	};

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color settings', 'wdsblocks' ) }
					colorSettings={ [
						{
							value: fontColor,
							onChange: ( value ) =>
								onChangeAttributes( 'fontColor', value ),
							label: __( 'Text Color', 'wdsblocks' ),
						},
					] }
				/>
			</InspectorControls>
			<div className={ className }>
				<InnerBlocks { ...innerBlocksProps } />
			</div>
		</>
	);
}
