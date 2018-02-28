import './editor.scss';

// Import other functionality.
import { TextOptionsAttributes } from './attributes';
import { TextOptionsInlineStyles } from './inline-styles';

// Export for ease of importing in individual blocks.
export {
	TextOptionsAttributes,
	TextOptionsInlineStyles,
};

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	ColorPalette,
} = wp.blocks;

const {
	PanelBody,
	PanelColor,
	PanelRow,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 *
 * @param {string} value The string value of the saved attribute.
 */
export default class TextOptions extends Component {
	onChangeTextColor = value => {
		const { setAttributes } = this.props;
		setAttributes( { textColor: value } );
	};

	render() {
		return (
			<PanelBody
				title={ __( 'Text Options' ) }
				className="wds-text-options"
			>
				<PanelRow>
					<div className="wds-text-option">
						<p>
							<PanelColor
								title={ __( 'Text Color' ) }
								colorValue={ this.props.attributes.textColor }
							>
								<ColorPalette
									value={ this.props.attributes.textColor }
									onChange={ this.onChangeTextColor }
								/>
							</PanelColor>
						</p>

						<p>
							{ __( 'Change the text color of this block.' ) }
						</p>
					</div>
				</PanelRow>

			</PanelBody>
		);
	}
}
