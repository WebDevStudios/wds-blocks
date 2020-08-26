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
	ColorPalette,
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { PREFIX, THEME_BKG_PALETTE } from '../../utils/constants';
import './editor.scss';

// Allowed blocks for `InnerBlocks` component
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
					placeholder: __(
						'Enter WDS Accordion Content...',
						'wdsblocks'
					),
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
		attributes: { title, desc, bkgColor },
		setAttributes,
		className,
	} = props;

	console.log(bkgColor);

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
			</InspectorControls>
			<div className={className} style={{ backgroundColor: bkgColor }}>
				<div className="wrap">
					<RichText
						tagName="h2"
						type="button"
						className={`wp-block-${className}__title`}
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
						className={`wp-block-${className}__desc`}
						onChange={onDescContent}
						value={desc ? desc : ''}
						placeholder={__(
							'WDS Accordion Group Description',
							'wdsblocks'
						)}
					/>
					<div className={`wp-block-${className}__content`}>
						<InnerBlocks {...innerBlocksProps} />
					</div>
				</div>
			</div>
		</>
	);
}
