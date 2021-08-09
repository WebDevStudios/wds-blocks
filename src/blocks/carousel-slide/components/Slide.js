import { compose } from '@wordpress/compose';
import { CONTAINER_CLASS } from '../../../utils/config';
import withBackgroundColor from '../../../utils/components/with-background-color';
import withBackgroundImage from '../../../utils/components/with-background-image';
import withBackgroundVideo from '../../../utils/components/with-background-video';
import withOverlayColor from '../../../utils/components/with-overlay-color';
import withFontColor from '../../../utils/components/with-font-color';

/**
 * The Slide component displays an individual carousel slide.
 *
 * @author WebDevStudios
 * @since  2.0.0
 * @param {Object} [props] Properties passed to the component.
 * @return {Element}        Element to render.
 */
export default function Slide( props ) {
	const {
		className,
		style,
		fontColor,
		customFontColor,
		backgroundType,
		backgroundColor,
		customBackgroundColor,
		backgroundImage,
		backgroundVideo,
		overlayColor,
		customOverlayColor,
		overlayOpacity,
		children,
	} = props;

	/**
	 * Display slide child content with wrapping container div.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 * @return {WPElement} Element to render.
	 */
	function SlideContent() {
		return <div className={ CONTAINER_CLASS }>{ children }</div>;
	}

	// Define props for wrapping component.
	const wrapProps = {
		className,
		style,
	};

	// Define HOCs to be composed.
	const composeHOCs = [];

	// Display slide with custom font color.
	if ( fontColor || customFontColor ) {
		composeHOCs.push( withFontColor );
		wrapProps.fontColor = fontColor;
		wrapProps.customFontColor = customFontColor;
	}

	// Determine HOC and extra props according to background type.
	switch ( backgroundType ) {
		// Display slide with color background.
		case 'color':
			composeHOCs.push( withBackgroundColor );
			wrapProps.backgroundColor = backgroundColor;
			wrapProps.customBackgroundColor = customBackgroundColor;
			break;

		// Display slide with image background.
		case 'image':
			composeHOCs.push( withBackgroundImage );
			wrapProps.backgroundImage = backgroundImage;
			break;

		// Display slide with video background.
		case 'video':
			composeHOCs.push( withBackgroundVideo );
			wrapProps.backgroundVideo = backgroundVideo;
	}

	// Add overlay for image or video background.
	if ( 'image' === backgroundType || 'video' === backgroundType ) {
		composeHOCs.push( withOverlayColor );
		wrapProps.overlayColor = overlayColor;
		wrapProps.customOverlayColor = customOverlayColor;
		wrapProps.overlayOpacity = overlayOpacity;
	}

	const SlideComponent = compose( composeHOCs )( 'div' ); // eslint-disable-line @wordpress/no-unused-vars-before-return

	// Display default slide.
	return (
		<SlideComponent { ...wrapProps }>
			<SlideContent />
		</SlideComponent>
	);
}
