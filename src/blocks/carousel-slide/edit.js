import { InnerBlocks, withColors } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import Settings from './Components/Settings';
import { CONTAINER_CLASS } from '../../utils/config';
import withBackgroundVideo from '../../utils/withBackgroundVideo';
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
 * Display inner blocks content with wrapping container div.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @return {WPElement} Element to render.
 */
function InnerBlocksContent() {
	return (
		<div className={ CONTAINER_CLASS }>
			<InnerBlocks { ...innerBlocksProps } />
		</div>
	);
}

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

	const classes = [ className ],
		styles = {};

	// Add custom color classes.
	classes.push( fontColor.color ? 'has-text-color' : null );
	classes.push( fontColor.class ? fontColor.class : null );
	classes.push( backgroundColor.color ? 'has-background' : null );
	classes.push(
		'color' === backgroundType && backgroundColor.class
			? backgroundColor.class
			: null
	);

	// Add custom color styles.
	styles.color = fontColor.color ? fontColor.color : undefined;
	styles.backgroundColor =
		'color' === backgroundType && backgroundColor.color
			? backgroundColor.color
			: undefined;
	if ( 'image' === backgroundType && backgroundImage ) {
		styles.backgroundImage = `url(${ backgroundImage.url })`;
		styles.backgroundSize = 'cover';
		styles.backgroundPosition = 'center';
	}

	const BlockWithBackgroundVideo = withBackgroundVideo( 'div' ),
		wrapProps = {
			className: classes.filter( Boolean ).join( ' ' ),
			style: { ...styles },
		};

	return (
		<>
			<Settings
				fontColor={ fontColor.color }
				setFontColor={ setFontColor }
				backgroundType={ backgroundType }
				backgroundColor={ backgroundColor.color }
				setBackgroundColor={ setBackgroundColor }
				backgroundImage={ backgroundImage }
				backgroundVideo={ backgroundVideo }
				setAttributes={ setAttributes }
			/>
			{ 'video' === backgroundType ? (
				<BlockWithBackgroundVideo
					{ ...wrapProps }
					backgroundVideo={ backgroundVideo }
				>
					<InnerBlocksContent />
				</BlockWithBackgroundVideo>
			) : (
				<div { ...wrapProps }>
					<InnerBlocksContent />
				</div>
			) }
		</>
	);
}

export default compose( [
	withColors( { fontColor: 'color', backgroundColor: 'background-color' } ),
] )( Edit );
