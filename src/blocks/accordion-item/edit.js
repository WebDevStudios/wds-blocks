import { RichText, InnerBlocks } from '@wordpress/block-editor';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { PREFIX } from '../../utils/config';
import InputLabel from '../accordions/components/InputLabel';
import './editor.scss';

// Block types that cann be added to
const ALLOWED_BLOCKS = applyFilters(
	`${ PREFIX }.accordion_allowed_blocks`,
	[ 'core/image', 'core/heading', 'core/paragraph', 'core/list' ] // Default value.
);

// Set up props for InnerBlocks component.
const innerBlocksProps = {
	allowedBlocks: ALLOWED_BLOCKS,
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @author WebDevStudios
 * @since 2.0.0
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} [props] Properties passed from the editor.
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const {
		attributes: { title },
		setAttributes,
		className,
		clientId,
	} = props;

	return (
		<div className={ className }>
			<InputLabel
				label={ __( 'Section Title ', 'wdsblocks' ) }
				req="true"
			/>
			<RichText
				tagName="h3"
				role="button"
				tabIndex="0"
				className={ `${ className }__title` }
				onChange={ ( value ) => setAttributes( { title: value } ) }
				value={ title ? title : '' }
				placeholder={ __( 'WDS Accordion Title', 'wdsblocks' ) }
				aria-expanded="false"
				aria-controls={ `${ PREFIX }-${ clientId }` }
				allowedFormats={ [ 'core/bold', 'core/italic' ] }
			/>
			<InputLabel
				label={ __( 'Section Content ', 'wdsblocks' ) }
				req="true"
			/>
			<div
				className={ `${ className }__content` }
				aria-hidden="true"
				tabIndex="-1"
				id={ `${ PREFIX }-${ clientId }` }
			>
				<div className={ `${ className }__content--inner` }>
					<InnerBlocks { ...innerBlocksProps } />
				</div>
			</div>
		</div>
	);
}
