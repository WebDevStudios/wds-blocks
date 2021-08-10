import { PanelBody, RangeControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorPaletteControl from '../color-palette-control';

/**
 * The OverlayPanel component displays a panel of controls for background overlay.
 *
 * @author WebDevStudios
 * @since  2.1.0
 * @param {Object} [props] Properties passed to the component.
 * @return {Element}        Element to render.
 */
export default function OverlayPanel( props ) {
	const {
		overlayColor,
		setOverlayColor,
		overlayOpacity,
		setOverlayOpacity,
	} = props;

	return (
		<PanelBody
			title={ __( 'Overlay settings', 'wdsblocks' ) }
			className="block-editor-panel-color-gradient-settings"
		>
			<ColorPaletteControl
				color={ overlayColor }
				setColor={ setOverlayColor }
				label={ __( 'Color', 'wdsblocks' ) }
			/>
			<RangeControl
				label={ __( 'Opacity', 'wdsblocks' ) }
				value={ overlayOpacity }
				onChange={ ( value ) => setOverlayOpacity( value ) }
				min={ 0 }
				max={ 100 }
			/>
		</PanelBody>
	);
}
