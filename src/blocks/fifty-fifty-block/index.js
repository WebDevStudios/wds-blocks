//  Import CSS.
import './style.scss';
import './editor.scss';

// Internal block libraries.
const { __ } = wp.i18n;
const {
	registerBlockType,
	RichText,
} = wp.blocks;

// Register block.
export default registerBlockType(
	'cmcgutenberg/editable-content-fifty-fifty',
	{
		title: __( 'Fifty Fifty Block' ),
		category: 'common',
		icon: 'edit',
		keywords: [
			__( 'Fifty Fifty' ),
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

			return (
				<section className={ props.className }>

					<header className="content-block-header">
						<h2>{ __( 'Fifty Fifty Block' ) }</h2>
					</header>

					<div className="content-block-container">

						<div className="content-block-content content-block-left">
							<h2>{ __( 'Left Block' ) }</h2>
							<RichText
								tagName="div"
								multiline="p"
								className="content-block-left"
								placeholder={ __( 'Enter your content here for the left Fifty Fifty block' ) }
								onChange={ onChangeMessageLeft }
								value={ props.attributes.messageLeft }
							/>
						</div>

						<div className="content-block-content content-block-right">
							<h2>{ __( 'Right Block' ) }</h2>
							<RichText
								tagName="div"
								multiline="p"
								className="content-block-right"
								placeholder={ __( 'Enter your content here for the right Fifty Fifty block' ) }
								onChange={ onChangeMessageRight }
								value={ props.attributes.messageRight }
							/>
						</div>
					</div>
				</section>
			);
		},
		save: props => {
			return (
				<section className="content-block grid-container fifty-fifty">

					<header className="content-block-header">
						<h2>{ __( 'Fifty Fifty Block' ) }</h2>
					</header>

					<div class="content-block-container">

						<div className="content-block-content content-block-left">
							{ props.attributes.messageLeft }
						</div>
						<div className="content-block-content content-block-right">
							{ props.attributes.messageRight }
						</div>
					</div>
				</section>
			);
		},
	},
);
