import {
	BlockControls,
	InspectorControls,
	RichText,
	InnerBlocks,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	Toolbar,
	ToggleControl,
	ColorPalette,
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { PREFIX, THEME_BKG_PALETTE } from '../../utils/constants';
import './editor.scss';

// Block types that cann be added to `InnerBlocks` component
const ALLOWED_BLOCKS = applyFilters(
	`${PREFIX}.accordion_group_allowed_blocks`,
	['wdsblocks/accordion'] // Default value.
);

// Block template for `InnerBlocks` component
const BLOCK_TEMPLATE = [
	[
		'wdsblocks/accordion',
		{
			title: __('WDS Accordion Title', 'wdsblocks'),
		},
		[
			[
				'core/paragraph',
				{
					content: __('Enter Accordion Content...', 'wdsblocks'),
					placeholder: __('Enter some content...', 'wdsblocks'),
				},
			],
		],
	],
];

// Set up props for InnerBlocks component.
const innerBlocksProps = {
	allowedBlocks: ALLOWED_BLOCKS,
	template: BLOCK_TEMPLATE,
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
export default function Edit(props) {
	const {
		attributes: { title, desc, bkgColor, openFirst },
		setAttributes,
		className,
		containerClass,
	} = props;

	console.log(props);

	// Update `title` field content on change.
	const onTitleContent = (newTitle) => {
		setAttributes({
			title: newTitle,
		});
	};

	// Update `desc` field content on change.
	const onDescContent = (newDesc) => {
		setAttributes({
			desc: newDesc,
		});
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Background Color', 'wdsblocks')}>
					<PanelRow>
						<ColorPalette
							colors={THEME_BKG_PALETTE}
							value={bkgColor}
							onChange={(value) =>
								setAttributes({
									bkgColor: value,
								})
							}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={__('Open First Accordion', 'wdsblocks')}>
					<PanelRow>
						<ToggleControl
							label={__('Yes', 'accordion-blocks')}
							help={__(
								'Expand the first accordion in the group on initial page load.',
								'wdsblocks'
							)}
							checked={openFirst}
							onChange={(value) =>
								setAttributes({ openFirst: value })
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			<div
				className={className}
				style={{ backgroundColor: bkgColor }}
				data-open-first={openFirst}
			>
				<div className={containerClass}>
					<RichText
						tagName="h2"
						type="button"
						className={`${className}__title`}
						onChange={onTitleContent}
						value={title ? title : ''}
						placeholder={__(
							'WDS Accordion Group Title',
							'wdsblocks'
						)}
						allowedFormats={['core/bold', 'core/italic']}
					/>
					<RichText
						tagName="p"
						className={`${className}__desc`}
						onChange={onDescContent}
						value={desc ? desc : ''}
						placeholder={__(
							'WDS Accordion Group Description',
							'wdsblocks'
						)}
					/>
					<div className={`${className}__content`}>
						<InnerBlocks {...innerBlocksProps} />
					</div>
				</div>
			</div>
		</>
	);
}
