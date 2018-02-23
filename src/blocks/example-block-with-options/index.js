import './style.scss';
import classnames from 'classnames';
import BackgroundOptions from '../../components/background-options';
import { BackgroundOptionsAttributes } from '../../components/background-options/attributes';
import OtherOptions from '../../components/other-options';
import { OtherOptionsAttributes } from '../../components/other-options/attributes';

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
			...BackgroundOptionsAttributes,
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
						<OtherOptions
							{ ...props }
						/>
					</InspectorControls>
				),
				<section
					key="editable-content-example-block-with-options"
					className={ classnames(
						props.className,
						{ 'has-image-background has-custom-background': 'image' === props.attributes.backgroundType },
						{ 'has-color-background has-custom-background': 'color' === props.attributes.backgroundType },
						{ 'has-video-background has-custom-background': 'video' === props.attributes.backgroundType },
						props.attributes.animationType ? `animated ${ props.attributes.animationType }` : null,
					) }
					style={ {
						backgroundColor: 'color' === props.attributes.backgroundType ? props.attributes.backgroundColor : null,
						backgroundImage: 'image' === props.attributes.backgroundType && props.attributes.backgroundImage ? `url(${ props.attributes.backgroundImage.url })` : null,
						color: props.attributes.textColor ? props.attributes.textColor : null,
					} }
				>

					{ 'video' === props.attributes.backgroundType && props.attributes.backgroundVideo ? (
						<video
							className="video-container video-container-overlay"
							autoPlay="true"
							loop="true"
							muted="true"
						>
							<source
								type="video/mp4"
								src={ props.attributes.backgroundVideo.url }
							/>
						</video>
					) : (
						null
					) }

					<header className="content-block-header">
						<h2
							style={ {
								color: props.attributes.textColor ? props.attributes.textColor : null,
							} }
						>
							{ __( 'Example Block with Options' ) }
						</h2>
					</header>

					<RichText
						tagName="div"
						multiline="p"
						className="content-block"
						placeholder={ __( 'Enter your content here for the left Example Block with Options' ) }
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
						{ 'has-image-background has-custom-background': 'image' === props.attributes.backgroundType },
						{ 'has-color-background has-custom-background': 'color' === props.attributes.backgroundType },
						{ 'has-video-background has-custom-background': 'video' === props.attributes.backgroundType },
						props.attributes.animationType ? `animated ${ props.attributes.animationType }` : null,
					) }
					style={ {
						backgroundColor: 'color' === props.attributes.backgroundType ? props.attributes.backgroundColor : null,
						backgroundImage: 'image' === props.attributes.backgroundType && props.attributes.backgroundImage ? `url(${ props.attributes.backgroundImage.url })` : null,
						color: props.attributes.textColor ? props.attributes.textColor : null,
					} }
				>

					{ 'video' === props.attributes.backgroundType && props.attributes.backgroundVideo ? (
						<video
							className="video-container video-container-overlay"
							autoPlay="true"
							loop="true"
							muted="true"
						>
							<source
								type="video/mp4"
								src={ props.attributes.backgroundVideo.url }
							/>
						</video>
					) : (
						null
					) }

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
