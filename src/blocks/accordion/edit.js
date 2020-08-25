import { BlockControls, RichText, InnerBlocks } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import { PREFIX } from '../../utils/constants';
import { ALLOWED_BLOCKS } from './utils/constants';
import './editor.scss';

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
export default function Edit(props) {
	const {
		attributes: { title },
		isSelected,
		setAttributes,
		clientId,
	} = props;

	console.log('edit-props', props);

	const MY_TEMPLATE = [['wdsblocks/accordion', {}]];

	// Update field content on change.
	const onChangeContent = (newTitle) => {
		setAttributes({ title: newTitle, clientId: clientId });
	};

	return (
		<div className={classNames(`${PREFIX}-accordion`)}>
			<RichText
				tagName="h3"
				role="button"
				className={`${PREFIX}-accordion__title`}
				onChange={onChangeContent}
				value={title ? title : ''}
				placeholder={__('WDS Accordion Title', 'wdsblocks')}
				aria-expanded="false"
				aria-controls={`${PREFIX}-${clientId}`}
			/>
			<div
				className={`${PREFIX}-accordion__content`}
				aria-hidden="true"
				tabindex="-1"
				id={`${PREFIX}-${clientId}`}
			>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
			</div>
		</div>
	);
}
