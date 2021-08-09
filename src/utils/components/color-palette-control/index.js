import { ColorPalette } from '@wordpress/block-editor';
import { BaseControl, ColorIndicator } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * The ColorPaletteControl component displays a control with label for selecting a color.
 *
 * @author WebDevStudios
 * @since  2.1.0
 * @param {Object} [props] Properties passed to the component.
 * @return {Element}        Element to render.
 */
export default function ColorPaletteControl( props ) {
	const { color, setColor, label } = props;

	return (
		<BaseControl>
			<fieldset>
				<legend>
					<div className="block-editor-color-gradient-control__color-indicator">
						<BaseControl.VisualLabel>
							{
								<>
									{ label }
									{ !! color && (
										<ColorIndicator
											colorValue={ color }
											aria-label={ sprintf(
												/* translators: current color value name */
												__( '(Color: %s)' ),
												color
											) }
										/>
									) }
								</>
							}
						</BaseControl.VisualLabel>
					</div>
				</legend>
				<ColorPalette value={ color } onChange={ setColor } />
			</fieldset>
		</BaseControl>
	);
}
