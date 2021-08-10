import {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { Platform } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import BackgroundSettingsPanel from '../../../utils/components/background-settings-panel';
import OverlayPanel from '../../../utils/components/overlay-panel';

/**
 * The Settings component displays settings for the Slide block via Inspector Controls.
 *
 * @author WebDevStudios
 * @since  2.0.0
 * @param {Object} [props] Properties passed to the component.
 * @return {Element}        Element to render.
 */
export default function Settings( props ) {
	const {
		fontColor,
		setFontColor,
		backgroundType,
		backgroundColor,
		setBackgroundColor,
		backgroundImage,
		backgroundVideo,
		overlayColor,
		setOverlayColor,
		overlayOpacity,
		setAttributes,
	} = props;

	const hasMediaBackground =
		'image' === backgroundType || 'video' === backgroundType;

	return (
		<InspectorControls>
			<PanelColorSettings
				title={ __( 'Color settings', 'wdsblocks' ) }
				colorSettings={ [
					{
						value: fontColor,
						onChange: setFontColor,
						label: __( 'Text Color', 'wdsblocks' ),
					},
				] }
			>
				{ 'web' === Platform.OS && 'color' === backgroundType && (
					<ContrastChecker
						backgroundColor={ backgroundColor }
						textColor={ fontColor }
					/>
				) }
			</PanelColorSettings>
			<BackgroundSettingsPanel
				backgroundType={ backgroundType }
				setBackgroundType={ ( value ) =>
					setAttributes( { backgroundType: value } )
				}
				backgroundColor={ backgroundColor }
				setBackgroundColor={ setBackgroundColor }
				backgroundImage={ backgroundImage }
				setBackgroundImage={ ( value ) =>
					setAttributes( {
						backgroundImage: value,
					} )
				}
				backgroundVideo={ backgroundVideo }
				setBackgroundVideo={ ( value ) =>
					setAttributes( {
						backgroundVideo: value,
					} )
				}
			/>
			{ hasMediaBackground && (
				<OverlayPanel
					overlayColor={ overlayColor }
					setOverlayColor={ setOverlayColor }
					overlayOpacity={ overlayOpacity }
					setOverlayOpacity={ ( value ) =>
						setAttributes( { overlayOpacity: value } )
					}
				/>
			) }
		</InspectorControls>
	);
}
