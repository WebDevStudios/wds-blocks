//  Import CSS.
import './style.scss';
import './editor.scss';

// Internal block libraries.
const { __ } = wp.i18n;
const {
	AlignmentToolbar,
	BlockControls,
	description,
	InspectorControls,
	MediaUpload,
	PlainText,
	registerBlockType,
	RichText,
} = wp.blocks;

const {
	Button,
	Dashicon,
	FormToggle,
	PanelBody,
	PanelRow,
	SelectControl,
} = wp.components;

// Register block.
export default registerBlockType(
	'wds/editable-content-two-column',
	{
		title: __( 'Two-Column Block' ),
		category: 'common',
		icon: 'edit',
		keywords: [
			__( 'Two-Column' ),
			__( 'Editable' ),
			__( 'Multiline' ),
		],
		attributes: {
			sectionTitle: {
				type: 'string',
				// selector: '.section-title',
			},
			messageLeft: {
				type: 'array',
				source: 'children',
				selector: '.content-block-left',
			},
			messageRight: {
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
		},
		edit: props => {
			const onChangeSectionTitle = value => {
				props.setAttributes( { sectionTitle: value } );
			};

			// Change the Left message value as we type.
			const onChangeMessageLeft = value => {
				props.setAttributes( { messageLeft: value } );
			};

			// Change the Right message value as we type.
			const onChangeMessageRight = value => {
				props.setAttributes( { messageRight: value } );
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

			// Displays the Left message block.
			function displayLeftMessage() {
				return (
					<div className="content-block-content content-block">
						<h2>{ __( 'Column Text' ) }</h2>

						{
							!! props.focus && (
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
							onChange={ onChangeMessageLeft }
							value={ props.attributes.messageLeft }
							focus={ props.focus }
							onFocus={ props.setFocus }
						/>
					</div>
				);
			}

			// Displays the Right message block.
			function displayRightMessage() {
				return (
					<div className="content-block-content content-block">
						<h2>{ __( 'Column Text' ) }</h2>

						{
							!! props.focus && (
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
							onChange={ onChangeMessageRight }
							value={ props.attributes.messageRight }
							focus={ props.focus }
							onFocus={ props.setFocus }
						/>
					</div>
				);
			}

			// Displays the Media Upload block.
			function displayMediaUpload() {
				return (
					<div className="content-block-content content-block">
						<h2>{ __( 'Column Image' ) }</h2>
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
								{ props.focus ? (
									<Button
										className="remove-image button button-large"
										onClick={ onRemoveImage }
									>
										<Dashicon icon="no-alt" /> { __( 'Remove Image' ) }
									</Button>
								) : null }
							</p>
						) }
					</div>
				);
			}

			// Check to see which option is set and display blocks as needed.
			function displayLayoutFields() {
				if ( 'text-image' === props.attributes.layout ) {
					return [
						displayLeftMessage(),
						displayMediaUpload(),
					];
				} else if ( 'image-text' === props.attributes.layout ) {
					return [
						displayMediaUpload(),
						displayLeftMessage(),
					];
				} else if ( 'text-text' === props.attributes.layout || ! props.attributes.layout ) {
					// If the toggle is clicked, display the Right column first.
					if ( props.attributes.columnOrder ) {
						return [
							displayRightMessage(),
							displayLeftMessage(),
						];
					}

					// Otherwise, display the columns as usual.
					return [
						displayLeftMessage(),
						displayRightMessage(),
					];
				}
			}

			return [
				!! props.focus && (
					<InspectorControls key="inspector">

						<description>
							<p>{ __( 'Layout options for the Two-Column Block' ) }</p>
						</description>

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

						</PanelBody>

					</InspectorControls>
				),
				<section key={ props.className } className={ props.className }>

					<header className="content-block-header">
						<h2>
							<PlainText
								className="section-title"
								value={ ! props.attributes.sectionTitle ? __( 'Two-Column Content Block Section Title (optional)' ) : props.attributes.sectionTitle }
								onChange={ onChangeSectionTitle }
							/>
						</h2>
					</header>

					<div className="content-block-container">
						{ displayLayoutFields() }
					</div>
				</section>,
			];
		},
		save: props => {
			// Display the output of the Left message block.
			function displayLeftMessageOutput() {
				return (
					<div
						key="content-block"
						className="content-block-content content-block-left"
						style={ { textAlign: props.attributes.alignmentLeft } }
					>
						{ props.attributes.messageLeft }
					</div>
				);
			}

			// Display the output of the Right message block.
			function displayRightMessageOutput() {
				return (
					<div
						key="content-block"
						className="content-block-content content-block-right"
						style={ { textAlign: props.attributes.alignmentRight } }
					>
						{ props.attributes.messageRight }
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
						displayLeftMessageOutput(),
						displayImageOutput(),
					];
				} else if ( 'image-text' === props.attributes.layout ) {
					return [
						displayImageOutput(),
						displayLeftMessageOutput(),
					];
				} else if ( 'text-text' === props.attributes.layout || ! props.attributes.layout ) {
					// If the toggle is clicked, display the Right column first.
					if ( props.attributes.columnOrder ) {
						return [
							displayRightMessageOutput(),
							displayLeftMessageOutput(),
						];
					}

					// Otherwise, display the columns as usual.
					return [
						displayLeftMessageOutput(),
						displayRightMessageOutput(),
					];
				}
			}

			return (
				<section className="content-block grid-container two-column">

					{ props.attributes.sectionTitle ? (
						<header className="content-block-header">
							<h2>{ props.attributes.sectionTitle }</h2>
						</header>
					) : (
						null
					) }

					<div className="content-block-container">
						{ displayLayoutOutput() }
					</div>
				</section>
			);
		},
	},
);
