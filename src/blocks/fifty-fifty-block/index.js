//  Import CSS.
import './style.scss';
import './editor.scss';

// Internal block libraries.
const { __ } = wp.i18n;
const {
	AlignmentToolbar,
	BlockControls,
	registerBlockType,
	RichText,
} = wp.blocks;

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
		},
		edit: props => {
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

			return (
				<section className={ props.className }>

					<header className="content-block-header">
						<h2>{ __( 'Two-Column Block' ) }</h2>
					</header>

					<div className="content-block-container">

						<div className="content-block-content content-block-left">
							<h2>{ __( 'Left Column' ) }</h2>

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
								placeholder={ __( 'Enter your content here for the left Two-Column block' ) }
								onChange={ onChangeMessageLeft }
								value={ props.attributes.messageLeft }
								focus={ props.focus }
								onFocus={ props.setFocus }
							/>
						</div>

						<div className="content-block-content content-block-right">
							<h2>{ __( 'Right Column' ) }</h2>

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
								placeholder={ __( 'Enter your content here for the right Two-Column block' ) }
								onChange={ onChangeMessageRight }
								value={ props.attributes.messageRight }
								focus={ props.focus }
								onFocus={ props.setFocus }
							/>
						</div>
					</div>
				</section>
			);
		},
		save: props => {
			return (
				<section className="content-block grid-container two-column">

					<header className="content-block-header">
						<h2>{ __( 'Two-Column Block' ) }</h2>
					</header>

					<div className="content-block-container">

						<div
							className="content-block-content content-block-left"
							style={ { textAlign: props.attributes.alignmentLeft } }
						>
							{ props.attributes.messageLeft }
						</div>
						<div
							className="content-block-content content-block-right"
							style={ { textAlign: props.attributes.alignmentRight } }
						>
							{ props.attributes.messageRight }
						</div>
					</div>
				</section>
			);
		},
	},
);
