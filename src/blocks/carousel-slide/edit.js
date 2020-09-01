import { InnerBlocks, withColors } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import Settings from './Components/Settings';
import Slide from './Components/Slide';
import './editor.scss';

// Set up props for InnerBlocks component.
const innerBlocksProps = {
	allowedBlocks: [ 'core/heading', 'core/paragraph', 'core/buttons' ],
	template: [
		[
			'core/heading',
			{
				content: __( 'Slide Title', 'wdsblocks' ),
				level: 4,
				align: 'center',
			},
		],
		[
			'core/paragraph',
			{
				content: __( 'Slide Content', 'wdsblocks' ),
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
function Edit( props ) {
	const {
		attributes: { backgroundType, backgroundImage, backgroundVideo },
		className,
		setAttributes,
		fontColor,
		setFontColor,
		backgroundColor,
		setBackgroundColor,
	} = props;

	// Define props relating to block background settings.
	const backgroundProps = {
		backgroundType,
		backgroundColor: backgroundColor.color,
		backgroundImage,
		backgroundVideo,
	};

	// Define props relating to slide settings.
	const slideProps = {
		...backgroundProps,
		className,
		fontColor: fontColor.hasOwnProperty( 'slug' )
			? fontColor.slug
			: undefined,
		customFontColor: fontColor.color,
		backgroundColor: backgroundColor.hasOwnProperty( 'slug' )
			? backgroundColor.slug
			: undefined,
		customBackgroundColor: backgroundColor.color,
	};

	return (
		<>
			<Settings
				fontColor={ fontColor.color }
				setFontColor={ setFontColor }
				setBackgroundColor={ setBackgroundColor }
				setAttributes={ setAttributes }
				{ ...backgroundProps }
			/>
			<Slide { ...slideProps }>
				<InnerBlocks { ...innerBlocksProps } />
			</Slide>
		</>
	);
}

export default compose( [
	withColors( { fontColor: 'color', backgroundColor: 'background-color' } ),
] )( Edit );
