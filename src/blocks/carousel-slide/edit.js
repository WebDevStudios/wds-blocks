import { InnerBlocks, withColors } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import Settings from './components/Settings';
import Slide from './components/Slide';
import { INNER_BLOCKS_PROPS } from './utils/config';
import './editor.scss';

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
function Edit( props ) {
	const {
		attributes,
		className,
		setAttributes,
		fontColor,
		setFontColor,
		backgroundColor,
		setBackgroundColor,
	} = props;

	// Define props relating to block background settings.
	const backgroundProps = {
		...attributes,
		backgroundColor: backgroundColor.color,
	};

	// Define props relating to slide settings.
	const slideProps = {
		...backgroundProps,
		className,
		fontColor: fontColor?.slug,
		customFontColor: fontColor.color,
		backgroundColor: backgroundColor?.slug,
		customBackgroundColor: backgroundColor.color,
	};

	return (
		<>
			<Settings
				{ ...backgroundProps }
				fontColor={ fontColor.color }
				setFontColor={ setFontColor }
				setBackgroundColor={ setBackgroundColor }
				setAttributes={ setAttributes }
			/>
			<Slide { ...slideProps }>
				<InnerBlocks
					{ ...INNER_BLOCKS_PROPS }
					__experimentalTagName={ 'div' }
					__experimentalPassedProps={ {
						className: 'slide-content',
					} }
				/>
			</Slide>
		</>
	);
}

export default compose( [
	withColors( { fontColor: 'color', backgroundColor: 'background-color' } ),
] )( Edit );
