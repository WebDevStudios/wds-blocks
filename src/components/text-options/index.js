/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { ColorPalette } = wp.editor;
const {
	PanelBody,
	PanelColor,
	PanelRow,
} = wp.components;

/**
 * Internal dependencies
 */
import TextOptionsAttributes from './attributes';
import TextOptionsInlineStyles from './inline-styles';
import TextOptionsClasses from './classes';
import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	TextOptionsAttributes,
	TextOptionsInlineStyles,
	TextOptionsClasses
};

function TextOptions( props ) {
	const setTextColor = value => props.setAttributes( { textColor: value } );

	return (
		<PanelBody
			title={ __( 'Text Options' ) }
			className="wds-text-options"
			initialOpen={ false }
		>
			<PanelRow>
				<div className="wds-text-option">
					<div>
						<PanelColor
							title={ __( 'Text Color' ) }
							colorValue={ props.attributes.textColor }
						>
							<ColorPalette
								value={ props.attributes.textColor }
								onChange={ setTextColor }
							/>
						</PanelColor>
					</div>
					<div>
						{ __( 'Change the text color of this block.' ) }
					</div>
				</div>
			</PanelRow>
		</PanelBody>
	);
}

export default TextOptions;
