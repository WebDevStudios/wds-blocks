import {
	RichText,
	BlockControls,
	InnerBlocks,
	InspectorControls,
	ColorPalette,
	AlignmentToolbar,
} from '@wordpress/block-editor';
import { Panel, PanelBody, PanelRow } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { Fragment, useEffect } from '@wordpress/element';
import { INNER_BLOCKS_PROPS } from './utils/config';
import { __ } from '@wordpress/i18n';
import PreviewToggle from '../../utils/components/preview-toggle';
import usePreviewToggle from '../../utils/hooks/use-preview-toggle';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @author WebDevStudios
 * @since  2.0.0
 * @see    https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} [props] Properties passed from the editor.
 * @return {WPElement}      Element to render.
 */
function Edit( props ) {
	const {
		attributes: {
			title,
			contentStyle,
			backgroundStyle,
			blockCount: blockCountAttr,
		},
		className,
		setAttributes,
		blockCount,
	} = props;
	const { showPreview, togglePreview, doubleClick } = usePreviewToggle();

	// Update inner block count attr on prop change.
	useEffect( () => {
		setAttributes( { blockCount } );
	}, [ blockCount ] );

	// Check if this is a new block.
	const isNewBlock = ! blockCountAttr;

	// If new/empty block, switch to edit mode.
	if ( isNewBlock && showPreview ) {
		togglePreview();
	}

	const onChangeTitle = ( newTitle ) => {
		setAttributes( {
			title: newTitle,
		} );
	};

	const onChangeTextColor = ( newColor ) => {
		const newColorValue = newColor === undefined ? 'none' : newColor;
		setAttributes( {
			contentStyle: {
				color: newColorValue,
				textAlign: contentStyle.textAlign,
			},
		} );
	};

	const onChangeBackgroundColor = ( newBgcolor ) => {
		const newBgcolorValue = newBgcolor === undefined ? 'none' : newBgcolor;
		setAttributes( {
			backgroundStyle: {
				backgroundColor: newBgcolorValue,
			},
		} );
	};

	const onChangeAlignment = ( newAlignment ) => {
		const alignmentValue =
			newAlignment === undefined ? 'none' : newAlignment;
		setAttributes( {
			contentStyle: {
				color: contentStyle.color,
				textAlign: alignmentValue,
			},
		} );
	};

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ contentStyle.textAlign }
					onChange={ onChangeAlignment }
				/>
				<PreviewToggle
					showPreview={ showPreview }
					togglePreview={ togglePreview }
				/>
			</BlockControls>
			<Fragment>
				<InspectorControls>
					<Panel className={ className }>
						<PanelBody
							title={ __( 'Color Settings', 'wdsblocks' ) }
							initialOpen={ true }
						>
							<PanelRow>
								{ __( 'Choose a text color.', 'wdsblocks' ) }
							</PanelRow>
							<ColorPalette
								value={ contentStyle.color }
								onChange={ onChangeTextColor }
							/>
							<PanelRow>
								{ __(
									'Choose a background color.',
									'wdsblocks'
								) }
							</PanelRow>
							<ColorPalette
								value={ backgroundStyle.backgroundColor }
								onChange={ onChangeBackgroundColor }
							/>
						</PanelBody>
					</Panel>
				</InspectorControls>
			</Fragment>
			<div
				className={ `${ className } ${
					showPreview ? 'preview-mode' : 'edit-mode'
				}` }
				onDoubleClick={ doubleClick }
			>
				{ showPreview ? (
					<div
						className={ `${ className } starter` }
						style={ backgroundStyle }
						blockCount={ blockCount }
						isAdmin={ true }
					>
						<RichText
							className="block-title"
							tagName="h2"
							formattingControls={ [] }
							style={ contentStyle }
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
					<div
						className={ `${ className } starter` }
						style={ backgroundStyle }
					>
						<RichText
							className="block-title"
							tagName="h2"
							formattingControls={ [] }
							style={ contentStyle }
							onChange={ onChangeTitle }
							placeholder={ __( 'Block Title', 'wdsblocks' ) }
							keepPlaceholderOnFocus={ true }
							value={ title }
						/>
						<InnerBlocks { ...INNER_BLOCKS_PROPS } />
					</div>
				) }
			</div>
		</>
	);
}

export default compose( [
	withSelect( ( select, props ) => {
		const { blockId } = props;

		// Get current child block (innerblocks) blockId values.
		const blockCount = select( 'core/block-editor' ).getBlockOrder(
			blockId
		).length;

		return { blockCount };
	} ),
] )( Edit );
