import {
	ContrastChecker,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { Platform, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import BackgroundSettingsPanel from '../../../utils/components/background-settings-panel';
import OverlayPanel from '../../../utils/components/overlay-panel';
import useMediaAverageColor from '../../../utils/hooks/use-media-average-color';

/**
 * The Settings component displays settings for the Slide block via Inspector Controls.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {Object} [props] Properties passed to the component.
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

	// `ref` to background media element.
	const mediaElementRef = useRef();

	// Average color of background media element.
	const { color: mediaColor } = useMediaAverageColor(
		mediaElementRef?.current
	);

	// Whether media element is currently set as background.
	const hasMediaBackground =
		'image' === backgroundType || 'video' === backgroundType;

	// Determine background color to contrast with `fontColor`.
	let backgroundContrastColor = backgroundColor;

	if ( hasMediaBackground && overlayOpacity && overlayOpacity > 50 ) {
		// Use overlay color as background contrast if above 50% opacity.
		backgroundContrastColor = overlayColor;
	} else if ( hasMediaBackground ) {
		// Use media average color if overlay is not set or opacity is <= 50%.
		backgroundContrastColor = mediaColor?.hex
			? mediaColor.hex
			: backgroundContrastColor;
	}

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
				{ 'web' === Platform.OS && (
					<ContrastChecker
						backgroundColor={ backgroundContrastColor }
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
				ref={ mediaElementRef }
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
