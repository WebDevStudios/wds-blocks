import classnames from 'classnames';
import BackgroundOptions from '../../components/background-options';

// Internal block libraries.
const { __ } = wp.i18n;
const {
	InspectorControls,
	registerBlockType,
	RichText,
} = wp.blocks;

// Register block.
export default registerBlockType(
	'wds/editable-content-example-block-with-options',
	{
		title: __( 'Example Block with Options' ),
		category: 'common',
		icon: 'edit',
		keywords: [
			__( 'Options' ),
			__( 'Editable' ),
			__( 'Multiline' ),
		],
		attributes: {
			message: {
				type: 'array',
				source: 'children',
				selector: '.content-block',
			},
			backgroundType: {
				type: 'string',
			},
			backgroundImage: {
				type: 'object',
			},
			backgroundColor: {
				type: 'string',
			},

		},
		edit: props => {
			const onChangeMessage = value => {
				props.setAttributes( { message: value } );
			};

			const onChangeBackgroundType = value => {
				props.setAttributes( { backgroundType: value } );
			};

			const onChangeBackgroundImage = value => {
				props.setAttributes( { backgroundImage: value } );
			};

			const onRemoveBackgroundImage = () => {
				props.setAttributes( { backgroundImage: null } );
			};

			const onChangeBackgroundColor = value => {
				props.setAttributes( { backgroundColor: value } );
			};

			return [
				!! props.focus && (
					<InspectorControls key="inspector">
						<BackgroundOptions
							{ ...{ onChangeBackgroundType, onChangeBackgroundImage, onRemoveBackgroundImage, onChangeBackgroundColor, ...props } }
						/>
					</InspectorControls>
				),
				<section className={ props.className }>

					<header className="content-block-header">
						<h2>{ __( 'Example Block with Options' ) }</h2>
					</header>

					<RichText
						tagName="div"
						multiline="p"
						className="content-block"
						placeholder={ __( 'Enter your content here for the left Example Block with Options' ) }
						onChange={ onChangeMessage }
						value={ props.attributes.message }
						style={ {
							backgroundColor: 'color' === props.attributes.backgroundType ? props.attributes.backgroundColor : null,
							backgroundImage: 'image' === props.attributes.backgroundType ? `url(${ props.attributes.backgroundImage.url })` : null,
						} }
						focus={ props.focus }
						onFocus={ props.setFocus }
					/>
				</section>,
			];
		},
		save: props => {
			return (
				<section
					className={ classnames(
						props.className,
						{ 'image-as-background': 'image' === props.attributes.backgroundType },
						{ 'color-as-background': 'color' === props.attributes.backgroundType },
					) }
					style={ {
						backgroundColor: 'color' === props.attributes.backgroundType ? props.attributes.backgroundColor : null,
						backgroundImage: 'image' === props.attributes.backgroundType ? `url(${ props.attributes.backgroundImage.url })` : null,
					} }
				>

					<header className="content-block-header">
						<h2>{ __( 'Example Block with Options' ) }</h2>
					</header>

					<div className="content-block-content content-block">
						{ props.attributes.message }
					</div>
				</section>
			);
		},
	},
);
