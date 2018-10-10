/**
 * BLOCK: Two-Column Block
 *
 * This is the two-column, or fifty-fifty, block.
 */

/**
 * External dependencies
 */
import classnames from 'classnames'; // Import NPM libraries here.

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const {
	registerBlockType,
} = wp.blocks;

const {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	MediaUpload,
	RichText,
} = wp.editor;

const {
	Button,
	Dashicon,
	FormToggle,
	PanelBody,
	PanelRow,
	SelectControl,
} = wp.components;

/**
 * Internal dependencies
 */
import './style.scss';
import './editor.scss';

// Import our Block Title component.
import BlockTitle, { BlockTitleAttributes, BlockTitleOutput } from '../../components/block-title';

// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/background-options';

// Import all of our Text Options requirements.
import TextOptions, { TextOptionsAttributes, TextOptionsInlineStyles, TextOptionsClasses } from '../../components/text-options';

// Import all of our Other Options requirements.
import OtherOptions, { OtherOptionsAttributes, OtherOptionsClasses } from '../../components/other-options';

/**
 * Register block
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
export default registerBlockType( 'wds/two-column', { // Namespaced with 'wds/', lowercase, hyphenated.
	// Localize title using wp.i18n.__()
	title: __( 'Two Column Block (WDS)' ),
	// Description: Write a quick description.
	description: __( 'A block to display two equal-width columns containing a combination of text and/or an image.' ),
	// Category options: common, formatting, layout, widgets, embed.
	category: 'wds-blocks',
	// Can use a Dashicon (see https://developer.wordpress.org/resource/dashicons/) or an imported SVG.
	icon: 'grid-view',
	// Limit to 3 keywords/phrases. Users will see your block when they search using these keywords.
	keywords: [
		__( 'Two-Column' ),
		__( 'Editable' ),
		__( 'Fifty/Fifty' ),
	],
	// Set for each piece of dynamic data used in your block.
	// https://wordpress.org/gutenberg/handbook/block-api/attributes/
	attributes: {
		contentLeft: {
			type: 'array',
			source: 'children',
			selector: '.content-block-left',
		},
		contentRight: {
			type: 'array',
			source: 'children',
			selector: '.content-block-right',
		},
		alignmentLeft: {
			type: 'string',
		},
		alignmentRight: {
			type: 'string',
		},
		imgURL: {
			type: 'string',
			source: 'attribute',
			attribute: 'src',
			selector: 'img',
		},
		imgID: {
			type: 'number',
		},
		imgAlt: {
			type: 'string',
			source: 'attribute',
			attribute: 'alt',
			selector: 'img',
		},
		layout: {
			type: 'string',
		},
		columnOrder: {
			type: 'boolean',
			default: false,
		},
		...BlockTitleAttributes,
		...BackgroundOptionsAttributes,
		...TextOptionsAttributes,
		...OtherOptionsAttributes,
	},
	// Determines what is displayed in the editor.
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/#edit
	edit: props => {
		// Change the Left content value as we type.
		const onChangeContentLeft = value => {
			props.setAttributes( { contentLeft: value } );
		};

		// Change the Right content value as we type.
		const onChangeContentRight = value => {
			props.setAttributes( { contentRight: value } );
		};

		// Listen for an alignment change.
		const onChangeAlignmentLeft = value => {
			props.setAttributes( { alignmentLeft: value } );
		};

		// Listen for an alignment change.
		const onChangeAlignmentRight = value => {
			props.setAttributes( { alignmentRight: value } );
		};

		// Select an image.
		const onSelectImage = img => {
			props.setAttributes( {
				imgID: img.id,
				imgURL: img.url,
				imgAlt: img.alt,
			} );
		};

		// Remove an image.
		const onRemoveImage = () => {
			props.setAttributes( {
				imgID: null,
				imgURL: null,
				imgAlt: null,
			} );
		};

		// Toggle our layout.
		const onChangeLayout = value => {
			props.setAttributes( { layout: value } );
		};

		// Toggle our column order.
		const toggleColumnOrder = () => {
			props.setAttributes( { columnOrder: ! props.attributes.columnOrder } );
		};

		// Displays the Left content block.
		// Details on RichText Editor: https://wordpress.org/gutenberg/handbook/block-api/rich-text-api/
		function displayLeftContent() {
			return (
				<div
					className="content-block-content content-block"
					key="two-column-content-left"
				>
					<h2>{ __( 'Text Column Area' ) }</h2>

					{
						!! props.isSelected && (
							<BlockControls key="controlsLeft">
								<AlignmentToolbar
									value={ props.attributes.alignmentLeft }
									onChange={ onChangeAlignmentLeft }
								/>
							</BlockControls>
						)
					}
					<RichText
						tagName="div"
						multiline="p"
						className="content-block-left"
						style={ { textAlign: props.attributes.alignmentLeft } }
						placeholder={ __( 'Enter your content here for one column of the Two-Column block' ) }
						onChange={ onChangeContentLeft }
						value={ props.attributes.contentLeft }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
					/>
				</div>
			);
		}

		// Displays the Right contenet block.
		function displayRightContent() {
			return (
				<div
					className="content-block-content content-block"
					key="two-column-content-right"
				>
					<h2>{ __( 'Text Column Area' ) }</h2>

					{
						!! props.isSelected && (
							<BlockControls key="controlsRight">
								<AlignmentToolbar
									value={ props.attributes.alignmentRight }
									onChange={ onChangeAlignmentRight }
								/>
							</BlockControls>
						)
					}
					<RichText
						tagName="div"
						multiline="p"
						className="content-block-right"
						style={ { textAlign: props.attributes.alignmentRight } }
						placeholder={ __( 'Enter your content here for one column of the Two-Column block' ) }
						onChange={ onChangeContentRight }
						value={ props.attributes.contentRight }
						formattingControls={ [ 'bold', 'italic', 'strikethrough' ] }
					/>
				</div>
			);
		}

		// Displays the Media Upload block.
		function displayMediaUpload() {
			return (
				<div
					className="content-block-content content-block"
					key="two-column-content-upload"
				>
					<h2>{ __( 'Image Column Area' ) }</h2>
					{ ! props.attributes.imgID ? (
						<MediaUpload
							buttonProps={ {
								className: 'components-button button button-large',
							} }
							onSelect={ onSelectImage }
							type="image"
							value={ props.attributes.imgID }
							render={ ( { open } ) => (
								<Button className="button button-large" onClick={ open }>
									<Dashicon icon="format-image" /> { ! props.attributes.imgID ? __( 'Upload Image' ) : <img src={ props.attributes.imgURL } alt={ props.attributes.imgAlt } /> }
								</Button>
							) }
						/>
					) : (
						<p className="image-wrapper">
							<img
								src={ props.attributes.imgURL }
								alt={ props.attributes.imgAlt }
							/>
							<Button
								className="remove-image button button-large"
								onClick={ onRemoveImage }
							>
								<Dashicon icon="no-alt" /> { __( 'Remove Image' ) }
							</Button>
						</p>
					) }
				</div>
			);
		}

		// Check to see which option is set and display blocks as needed.
		function displayLayoutFields() {
			if ( 'text-image' === props.attributes.layout ) {
				return [
					displayLeftContent(),
					displayMediaUpload(),
				];
			} else if ( 'image-text' === props.attributes.layout ) {
				return [
					displayMediaUpload(),
					displayLeftContent(),
				];
			} else if ( 'text-text' === props.attributes.layout || ! props.attributes.layout ) {
				// If the toggle is clicked, display the Right column first.
				if ( props.attributes.columnOrder ) {
					return [
						displayRightContent(),
						displayLeftContent(),
					];
				}

				// Otherwise, display the columns as usual.
				return [
					displayLeftContent(),
					displayRightContent(),
				];
			}
		}

		return [
			!! props.isSelected && (
				<InspectorControls key="inspector">
					<PanelBody
						className="wds-two-column-options"
						title={ __( 'Two-Column Options Panel' ) }
					>

						<PanelRow>
							<SelectControl
								key="layout"
								label={ __( 'Layout' ) }
								value={ props.attributes.layout ? props.attributes.layout : '' }
								options={ [
									{
										label: __( 'Text/Text' ),
										value: 'text-text',
									},
									{
										label: __( 'Text/Image' ),
										value: 'text-image',
									},
									{
										label: __( 'Image/Text' ),
										value: 'image-text',
									},
								] }
								onChange={ onChangeLayout }
							/>
						</PanelRow>

						{
							'text-text' === props.attributes.layout || ! props.attributes.layout ? (
								<PanelRow>
									<label
										htmlFor="column-order"
										className="blocks-base-control__label"
									>
										{ __( 'Switch Text Column Order' ) }
									</label>

									<FormToggle
										id="column-order"
										label={ __( 'Column Order' ) }
										checked={ !! props.attributes.columnOrder }
										onChange={ toggleColumnOrder }
									/>
								</PanelRow>
							) : (
								null
							)
						}

						{ BackgroundOptions( props ) }
						{ TextOptions( props ) }
						{ OtherOptions( props ) }

					</PanelBody>

				</InspectorControls>
			),
			<section
				key={ props.className }
				className={ classnames(
					props.className,
					...BackgroundOptionsClasses( props ),
					...OtherOptionsClasses( props ),
					...TextOptionsClasses( props ),
				) }
				style={ {
					...BackgroundOptionsInlineStyles( props ),
					...TextOptionsInlineStyles( props ),
				} }
			>

				{ BackgroundOptionsVideoOutput( props ) }

				<BlockTitle
					{ ...props }
				/>

				<div className="content-block-container">
					{ displayLayoutFields() }
				</div>
			</section>,
		];
	},
	// https://wordpress.org/gutenberg/handbook/blocks/introducing-attributes-and-editable-fields/#attributes
	// https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	save: props => {
		// Display the output of the Left content block.
		function displayLeftContentOutput() {
			return (
				<div
					key="content-block"
					className="content-block-content content-block-left"
					style={ { textAlign: props.attributes.alignmentLeft } }
				>
					{ props.attributes.contentLeft }
				</div>
			);
		}

		// Display the output of the Right content block.
		function displayRightContentOutput() {
			return (
				<div
					key="content-block"
					className="content-block-content content-block-right"
					style={ { textAlign: props.attributes.alignmentRight } }
				>
					{ props.attributes.contentRight }
				</div>
			);
		}

		// Display the output of the Image block.
		function displayImageOutput() {
			return (
				<div
					key="content-block-image"
					className="content-block-content content-block"
					style={ { textAlign: props.attributes.alignmentRight } }
				>
					<img
						src={ props.attributes.imgURL }
						alt={ props.attributes.imgAlt }
					/>
				</div>
			);
		}

		// Check our layout type and display blocks as needed.
		function displayLayoutOutput() {
			if ( 'text-image' === props.attributes.layout ) {
				return [
					displayLeftContentOutput(),
					displayImageOutput(),
				];
			} else if ( 'image-text' === props.attributes.layout ) {
				return [
					displayImageOutput(),
					displayLeftContentOutput(),
				];
			} else if ( 'text-text' === props.attributes.layout || ! props.attributes.layout ) {
				// If the toggle is clicked, display the Right column first.
				if ( props.attributes.columnOrder ) {
					return [
						displayRightContentOutput(),
						displayLeftContentOutput(),
					];
				}

				// Otherwise, display the columns as usual.
				return [
					displayLeftContentOutput(),
					displayRightContentOutput(),
				];
			}
		}

		return (
			<section
				className={ classnames(
					props.className,
					'content-block grid-container two-column',
					...BackgroundOptionsClasses( props ),
					...OtherOptionsClasses( props ),
				) }
				style={ {
					...BackgroundOptionsInlineStyles( props ),
					...TextOptionsInlineStyles( props ),
				} }
			>

				{ BackgroundOptionsVideoOutput( props ) }

				<BlockTitleOutput
					{ ...props }
				/>

				<div className="content-block-container">
					{ displayLayoutOutput() }
				</div>
			</section>
		);
	},
	deprecated: [
		{
			attributes: {
				contentLeft: {
					type: 'array',
					source: 'children',
					selector: '.content-block-left',
				},
				contentRight: {
					type: 'array',
					source: 'children',
					selector: '.content-block-right',
				},
				alignmentLeft: {
					type: 'string',
				},
				alignmentRight: {
					type: 'string',
				},
				imgURL: {
					type: 'string',
					source: 'attribute',
					attribute: 'src',
					selector: 'img',
				},
				imgID: {
					type: 'number',
				},
				imgAlt: {
					type: 'string',
					source: 'attribute',
					attribute: 'alt',
					selector: 'img',
				},
				layout: {
					type: 'string',
				},
				columnOrder: {
					type: 'boolean',
					default: false,
				},
				...BlockTitleAttributes,
				...BackgroundOptionsAttributes,
				...TextOptionsAttributes,
				...OtherOptionsAttributes,
			},
			save( props ) {
				// Display the output of the Left content block.
				function displayLeftContentOutput() {
					return (
						<div
							key="content-block"
							className="content-block-content content-block-left"
							style={ { textAlign: props.attributes.alignmentLeft } }
						>
							{ props.attributes.contentLeft }
						</div>
					);
				}

				// Display the output of the Right content block.
				function displayRightContentOutput() {
					return (
						<div
							key="content-block"
							className="content-block-content content-block-right"
							style={ { textAlign: props.attributes.alignmentRight } }
						>
							{ props.attributes.contentRight }
						</div>
					);
				}

				// Display the output of the Image block.
				function displayImageOutput() {
					return (
						<div
							key="content-block-image"
							className="content-block-content content-block"
							style={ { textAlign: props.attributes.alignmentRight } }
						>
							<img
								src={ props.attributes.imgURL }
								alt={ props.attributes.imgAlt }
							/>
						</div>
					);
				}

				// Check our layout type and display blocks as needed.
				function displayLayoutOutput() {
					if ( 'text-image' === props.attributes.layout ) {
						return [
							displayLeftContentOutput(),
							displayImageOutput(),
						];
					} else if ( 'image-text' === props.attributes.layout ) {
						return [
							displayImageOutput(),
							displayLeftContentOutput(),
						];
					} else if ( 'text-text' === props.attributes.layout || ! props.attributes.layout ) {
						// If the toggle is clicked, display the Right column first.
						if ( props.attributes.columnOrder ) {
							return [
								displayRightContentOutput(),
								displayLeftContentOutput(),
							];
						}

						// Otherwise, display the columns as usual.
						return [
							displayLeftContentOutput(),
							displayRightContentOutput(),
						];
					}
				}

				return (
					<section
						className={ classnames(
							props.className,
							'content-block grid-container two-column',
							...BackgroundOptionsClasses( props ),
							...OtherOptionsClasses( props ),
						) }
						style={ {
							...BackgroundOptionsInlineStyles( props ),
							...TextOptionsInlineStyles( props ),
						} }
					>

						{ BackgroundOptionsVideoOutput( props ) }

						<BlockTitleOutput
							{ ...props }
						/>

						<div className="content-block-container">
							{ displayLayoutOutput() }
						</div>
					</section>
				);
			},
		},
	],
} );
