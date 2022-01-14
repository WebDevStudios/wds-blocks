import { InnerBlocks, RichText, BlockControls } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { INNER_BLOCKS_PROPS } from './utils/config';
import usePreviewToggle from '../../utils/hooks/use-preview-toggle';
import PreviewToggle from '../../utils/components/preview-toggle';
import { useEffect } from '@wordpress/element';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @author WebDevStudios
 * @since  2.3
 * @see    https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} props Properties passed from the editor.
 * @return {WPElement}   Element to render.
 */
export default function Edit( props ) {
	const {
		attributes: { title },
		className,
		setAttributes,
	} = props;

	const { showPreview, togglePreview, doubleClick } = usePreviewToggle();

	useEffect( () => {
		togglePreview();
	}, [] );

	return (
		<>
			<BlockControls>
				<PreviewToggle
					showPreview={ showPreview }
					togglePreview={ togglePreview }
				/>
			</BlockControls>
			<div
				className={ `${ className } ${
					showPreview ? 'preview-mode' : 'edit-mode'
				}` }
				onDoubleClick={ doubleClick }
			>
				{ showPreview ? (
					<div className={ `${ className } call-to-action` }>
						<RichText
							allowedFormats={ [] }
							aria-label={ __( 'Title text', 'wdsblocks' ) }
							tagName="h2"
							value={ title }
						/>
						<InnerBlocks
							{ ...INNER_BLOCKS_PROPS }
							__experimentalTagName={ 'div' }
							__experimentalPassedProps={ {
								className: 'inner-blocks',
							} }
							renderAppender={ false }
						/>
					</div>
				) : (
					<div className={ `${ className } call-to-action` }>
						<RichText
							allowedFormats={ [] }
							aria-label={ __( 'Title text', 'wdsblocks' ) }
							identifier="title"
							onChange={ ( newTitle ) => {
								setAttributes( { title: newTitle } );
							} }
							placeholder={ __( 'Call To Action', 'wdsblocks' ) }
							tagName="h2"
							value={ title }
						/>
						<InnerBlocks { ...INNER_BLOCKS_PROPS } />
					</div>
				) }
			</div>
		</>
	);
}
