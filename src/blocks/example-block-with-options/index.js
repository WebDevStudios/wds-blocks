import './style.scss';
import classnames from 'classnames';

// Import all of our Background Options requirements.
import BackgroundOptions, { BackgroundOptionsAttributes, BackgroundOptionsClasses, BackgroundOptionsInlineStyles, BackgroundOptionsVideoOutput } from '../../components/background-options';

// Import all of our Text Options requirements.
import TextOptions, { TextOptionsAttributes, TextOptionsInlineStyles } from '../../components/text-options';

// Import all of our Other Options requirements.
import OtherOptions, { OtherOptionsAttributes, OtherOptionsClasses, OtherOptionsInlineStyles } from '../../components/other-options';

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
		title: __( 'WDS Example Block with Options' ),
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
			...BackgroundOptionsAttributes,
			...TextOptionsAttributes,
			...OtherOptionsAttributes,
		},
		edit: props => {
			const onChangeMessage = value => {
				props.setAttributes( { message: value } );
			};

			return [
				!! props.focus && (
					<InspectorControls key="inspector">
						<BackgroundOptions
							{ ...props }
						/>
						<TextOptions
							{ ...props }
						/>
						<OtherOptions
							{ ...props }
						/>
					</InspectorControls>
				),
				<section
					key="editable-content-example-block-with-options"
					className={ classnames(
						props.className,
						...BackgroundOptionsClasses( props ),
						...OtherOptionsClasses( props ),
					) }
					style={ {
						...BackgroundOptionsInlineStyles( props ),
						...TextOptionsInlineStyles( props ),
					} }
				>

					{ BackgroundOptionsVideoOutput( props ) }

					<header className="content-block-header">
						<h2
							style={ {
								color: props.attributes.textColor ? props.attributes.textColor : null,
							} }
						>
							{ __( 'WDS Example Block with Options' ) }
						</h2>
					</header>

					<RichText
						tagName="div"
						multiline="p"
						className="content-block"
						placeholder={ __( 'Enter your content here for the WDS Example Block with Options' ) }
						onChange={ onChangeMessage }
						value={ props.attributes.message }
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
						...BackgroundOptionsClasses( props ),
						...OtherOptionsClasses( props ),
					) }
					style={ {
						...BackgroundOptionsInlineStyles( props ),
						...TextOptionsInlineStyles( props ),
					} }
				>

					{ BackgroundOptionsVideoOutput( props ) }

					<header className="content-block-header">
						<h2>{ __( 'WDS Example Block with Options' ) }</h2>
					</header>

					<div className="content-block-content content-block">
						{ props.attributes.message }
					</div>
				</section>
			);
		},
	},
);
