import Glide from '@glidejs/glide';
import { InnerBlocks } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import Slider from './components/Slider';
import { PREFIX } from '../../utils/config';
import PreviewToggle from '../../utils/preview-toggle/PreviewToggle';
import usePreviewToggle from '../../utils/preview-toggle/usePreviewToggle';
import './editor.scss';

// Set up props for InnerBlocks component.
const innerBlocksProps = {
	allowedBlocks: [ `${ PREFIX }/carousel-slide` ],
	template: [ [ `${ PREFIX }/carousel-slide`, {} ] ],
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
	const { className, setAttributes, slideIds } = props;
	const { showPreview, togglePreview } = usePreviewToggle();
	const slider = new Glide( '.glide', {
		autoplay: 5000,
		focusAt: 'center',
		gap: 0,
		type: 'carousel',
	} );

	useEffect( () => {
		// Mount or unmount glide functionality.
		if ( showPreview ) {
			slider.mount();
		} else {
			slider.destroy();
		}

		// Update showPreview attribute on state change.
		setAttributes( {
			showPreview,
		} );
	}, [ showPreview ] );

	return (
		<>
			<PreviewToggle
				showPreview={ showPreview }
				togglePreview={ togglePreview }
			/>
			<div
				className={ `${ className } glide ${
					showPreview ? 'preview-mode' : 'edit-mode'
				}` }
			>
				{ showPreview ? (
					<Slider slideCount={ slideIds.length }>
						<InnerBlocks
							{ ...innerBlocksProps }
							__experimentalTagName={ 'ul' }
							__experimentalPassedProps={ {
								className: 'glide__slides slider-slides',
							} }
							renderAppender={ false }
						/>
					</Slider>
				) : (
					<InnerBlocks { ...innerBlocksProps } />
				) }
			</div>
		</>
	);
}

export default compose( [
	withSelect( ( select, props ) => {
		const { clientId } = props;

		// Get current child block (slide) clientId values.
		const slideIds = select( 'core/block-editor' ).getBlockOrder(
			clientId
		);

		return { slideIds };
	} ),
] )( Edit );
