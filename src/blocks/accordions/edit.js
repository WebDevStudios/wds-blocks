import { useEffect } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import {
	InnerBlocks,
	withColors,
	PanelColorSettings,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	BaseControl,
	ToggleControl,
	ColorIndicator,
	ColorPalette,
} from '@wordpress/components';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { PREFIX, CONTAINER_CLASS, THEME_BKG_PALETTE } from '../../utils/config';
import PreviewToggle from '../../utils/components/PreviewToggle';
import usePreviewToggle from '../../utils/hooks/usePreviewToggle';
import withBackgroundColor from '../../utils/components/withBackgroundColor';
import withFontColor from '../../utils/components/withFontColor';
import './editor.scss';
import InputLabel from './components/InputLabel';
import wdsBlocksAccordion from '../accordion/frontend/';

// Block types that cann be added to `InnerBlocks` component
const ALLOWED_BLOCKS = applyFilters(
	`${ PREFIX }.accordion_group_allowed_blocks`,
	[ 'wdsblocks/accordion' ] // Default value.
);

// Block template for `InnerBlocks` component
const BLOCK_TEMPLATE = [
	[
		'wdsblocks/accordion',
		{
			title: __( 'Accordion Title', 'wdsblocks' ),
		},
		[
			[
				'core/paragraph',
				{
					content: __( 'Accordion content here…', 'wdsblocks' ),
					placeholder: __( 'Accordion content here…', 'wdsblocks' ),
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
function Edit( props ) {
	const {
		attributes: { title, desc, bkgColor, openFirst, toggle },
		setAttributes,
		className,
		fontColor,
		setFontColor,
		backgroundColor,
		setBackgroundColor,
	} = props;

	const { showPreview, togglePreview, doubleClick } = usePreviewToggle();
	const showTitle = title && title[ 0 ] !== undefined ? true : false;
	const showDesc = desc && desc[ 0 ] !== undefined ? true : false;

	useEffect( () => {
		// Trigger `init` on state update.
		if ( showPreview ) {
			wdsBlocksAccordion.init();
		}
	}, [ showPreview, openFirst, toggle ] );

	const wrapProps = {
		className: classnames(
			className,
			showPreview ? 'preview-mode' : 'edit-mode'
		),
	};
	// Define HOCs to be composed.
	const composeHOCs = [];

	// Display with font color.
	if ( fontColor ) {
		composeHOCs.push( withFontColor );
		wrapProps.fontColor = fontColor?.slug;
		wrapProps.customFontColor = fontColor.color;
	}
	// Display with  ackground color.
	if ( backgroundColor ) {
		composeHOCs.push( withBackgroundColor );
		wrapProps.backgroundColor = backgroundColor?.slug;
		wrapProps.customBackgroundColor = backgroundColor.color;
	}

	const AccordionComponent = compose( composeHOCs )( 'div' );

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color settings', 'wdsblocks' ) }
					colorSettings={ [
						{
							value: fontColor.color,
							onChange: setFontColor,
							label: __( 'Text Color', 'wdsblocks' ),
						},
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background Color', 'wdsblocks' ),
						},
					] }
				/>
				<PanelBody title={ __( 'Background Color', 'wdsblocks' ) }>
					<PanelRow>
						<BaseControl
							label="Selected Color"
							id="wds-selected-color"
						>
							<ColorIndicator colorValue={ bkgColor } />
						</BaseControl>
					</PanelRow>
					<PanelRow>
						<ColorPalette
							colors={ THEME_BKG_PALETTE }
							value={ bkgColor }
							onChange={ ( value ) =>
								setAttributes( {
									bkgColor: value,
								} )
							}
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title={ __( 'Settings', 'wdsblocks' ) }>
					<BaseControl
						label={ __( 'Expand First Accordion', 'wdsblocks' ) }
						id="wds-expand-first"
						help="Automatically expand the first accordion in this group on initial page load."
					></BaseControl>
					<PanelRow>
						<ToggleControl
							label={ __(
								'Yes - Expand First Accordion',
								'accordion-blocks'
							) }
							checked={ openFirst }
							onChange={ ( value ) =>
								setAttributes( {
									openFirst: value,
								} )
							}
						/>
					</PanelRow>

					<hr />

					<BaseControl
						label={ __( 'Toggle Others', 'wdsblocks' ) }
						id="wds-toggle-others"
						help="Collaspe open accordions when expanding another."
					></BaseControl>
					<PanelRow>
						<ToggleControl
							label={ __(
								'Yes - Toggle Others',
								'accordion-blocks'
							) }
							checked={ toggle }
							onChange={ ( value ) =>
								setAttributes( {
									toggle: value,
								} )
							}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<AccordionComponent
				{ ...wrapProps }
				//style={ { backgroundColor: bkgColor } }
				data-open-first={ openFirst }
				data-toggle={ toggle }
				onDoubleClick={ doubleClick }
			>
				<div className={ CONTAINER_CLASS }>
					<InputLabel
						label={ __( 'Title (optional)', 'wdsblocks' ) }
					/>
					<RichText
						tagName="h2"
						type="button"
						className={ classnames(
							`${ className }__title`,
							! showTitle ? 'input-hidden' : ''
						) }
						onChange={ ( value ) =>
							setAttributes( {
								title: value,
							} )
						}
						value={ title ? title : '' }
						placeholder={ __( 'Enter a title...', 'wdsblocks' ) }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
					/>
					<InputLabel
						label={ __(
							'Short Description (optional)',
							'wdsblocks'
						) }
					/>
					<RichText
						tagName="p"
						className={ classnames(
							`${ className }__desc`,
							! showDesc ? 'input-hidden' : ''
						) }
						onChange={ ( value ) =>
							setAttributes( {
								desc: value,
							} )
						}
						value={ desc ? desc : '' }
						placeholder={ __(
							'Enter a short description...',
							'wdsblocks'
						) }
					/>
					<div className={ `${ className }__content` }>
						<PreviewToggle
							showPreview={ showPreview }
							togglePreview={ togglePreview }
						/>
						<InnerBlocks { ...innerBlocksProps } />
					</div>
				</div>
			</AccordionComponent>
		</>
	);
}

export default compose( [
	withColors( { fontColor: 'color', backgroundColor: 'background-color' } ),
] )( Edit );
