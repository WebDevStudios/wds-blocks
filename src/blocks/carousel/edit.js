import Glide from '@glidejs/glide';
import { InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import Slider from './components/Slider';
import { GLIDE_SETTINGS, INNER_BLOCKS_PROPS } from './utils/config';
import wdsBlocksBackgroundVideo from '../../utils/modules/backgroundVideo';
import PreviewToggle from '../../utils/components/PreviewToggle';
import usePreviewToggle from '../../utils/hooks/usePreviewToggle';
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
		attributes: { slideCount: slideCountAttr },
		className,
		clientId,
		setAttributes,
		slideCount,
	} = props;
	const { showPreview, togglePreview, doubleClick } = usePreviewToggle();
	const slider = new Glide( `#block-${ clientId }`, GLIDE_SETTINGS );

	useEffect( () => {
		// Mount or unmount glide functionality.
		if ( showPreview ) {
			slider.mount();
		} else {
			slider.destroy();
		}

		// Mute all background videos.
		wdsBlocksBackgroundVideo.init();

		// Update showPreview attribute on state change.
		setAttributes( {
			showPreview,
		} );
	}, [ showPreview ] );

	// Update slide count attr on prop change.
	useEffect( () => {
		setAttributes( { slideCount } );
	}, [ slideCount ] );

	// Check if this is a new block.
	const isNewBlock = ! slideCountAttr;

	// If new/empty block, switch to edit mode.
	if ( isNewBlock && showPreview ) {
		togglePreview();
	}

	return (
		<>
			<PreviewToggle
				showPreview={ showPreview }
				togglePreview={ togglePreview }
			/>
			<div
				className={ `${ className } ${
					showPreview ? 'preview-mode' : 'edit-mode'
				}` }
				onDoubleClick={ doubleClick }
			>
				{ showPreview ? (
					<Slider slideCount={ slideCount } isAdmin={ true }>
						<InnerBlocks
							{ ...INNER_BLOCKS_PROPS }
							__experimentalTagName={ 'ul' }
							__experimentalPassedProps={ {
								className: 'glide__slides slider-slides',
							} }
							renderAppender={ false }
						/>
					</Slider>
				) : (
					<InnerBlocks { ...INNER_BLOCKS_PROPS } />
				) }
			</div>
		</>
	);
}

export default compose( [
	withSelect( ( select, props ) => {
		const { clientId } = props;

		// Get current child block (slide) clientId values.
		const slideCount = select( 'core/block-editor' ).getBlockOrder(
			clientId
		).length;

		return { slideCount };
	} ),
] )( Edit );
