import { InnerBlocks } from '@wordpress/block-editor';
import PreviewToggle from "../../utils/preview-toggle/PreviewToggle";
import usePreviewToggle from "../../utils/preview-toggle/usePreviewToggle";
import './editor.scss';

// Set up props for InnerBlocks component.
const innerBlocksProps = {
	allowedBlocks: [ 'wdsblocks/carousel-slide' ],
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
export default function Edit( props ) {
	const { className } = props;
	const { showPreview, togglePreview } = usePreviewToggle();

	return (
		<>
			<PreviewToggle
				showPreview={ showPreview }
				togglePreview={ togglePreview }
			/>
			<div className={ `${ className } ${ showPreview ? 'preview-mode' : 'edit-mode' }` }>
				<InnerBlocks { ...innerBlocksProps } />
			</div>
		</>
	);
}
