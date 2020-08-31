import { CONTAINER_CLASS } from '../../../utils/config';
import withBackgroundImage from '../../../utils/withBackgroundImage';
import withBackgroundVideo from '../../../utils/withBackgroundVideo';

/**
 * The Slide component displays an individual carousel slide.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {Object} [props] Properties passed to the component.
 * @return {Element}        Element to render.
 */
export default function Slide( props ) {
	const {
		classes,
		styles,
		backgroundType,
		backgroundImage,
		backgroundVideo,
		children,
	} = props;

	/**
	 * Display slide child content with wrapping container div.
	 *
	 * @author WebDevStudios
	 * @since  2.0.0
	 *
	 * @return {WPElement} Element to render.
	 */
	function SlideContent() {
		return <div className={ CONTAINER_CLASS }>{ children }</div>;
	}

	// Define props for wrapping component.
	const wrapProps = {
		className: classes.filter( Boolean ).join( ' ' ),
		style: { ...styles },
	};

	// Display slide with image background.
	if ( 'image' === backgroundType ) {
		const BlockWithBackgroundImage = withBackgroundImage( 'div' );

		return (
			<BlockWithBackgroundImage
				backgroundImage={ backgroundImage }
				{ ...wrapProps }
			>
				<SlideContent />
			</BlockWithBackgroundImage>
		);
	}

	// Display slide with video background.
	if ( 'video' === backgroundType ) {
		const BlockWithBackgroundVideo = withBackgroundVideo( 'div' );

		return (
			<BlockWithBackgroundVideo
				backgroundVideo={ backgroundVideo }
				{ ...wrapProps }
			>
				<SlideContent />
			</BlockWithBackgroundVideo>
		);
	}

	// Display default slide.
	return (
		<div { ...wrapProps }>
			<SlideContent />
		</div>
	);
}
