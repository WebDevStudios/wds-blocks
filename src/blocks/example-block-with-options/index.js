import './style.scss';
import classnames from 'classnames';
import BackgroundOptions from '../../components/background-options';
import OtherOptions from '../../components/other-options';

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
			backgroundVideo: {
				type: 'object',
			},
			backgroundColor: {
				type: 'string',
			},
			animationType: {
				type: 'string',
			},
			textColor: {
				type: 'string',
			},

		},
		edit: props => {
			const onChangeMessage = value => {
				props.setAttributes( { message: value } );
			};

			// Start Background Options.
			const onChangeBackgroundType = value => {
				props.setAttributes( { backgroundType: value } );
			};

			const onChangeBackgroundImage = value => {
				props.setAttributes( { backgroundImage: value } );
			};

			const onRemoveBackgroundImage = () => {
				props.setAttributes( { backgroundImage: null } );
			};

			const onChangeBackgroundVideo = value => {
				props.setAttributes( { backgroundVideo: value } );
			};

			const onRemoveBackgroundVideo = () => {
				props.setAttributes( { backgroundVideo: null } );
			};

			const onChangeBackgroundColor = value => {
				props.setAttributes( { backgroundColor: value } );
			};
			// End Background Options.

			// Start Other Options.
			const onChangeAnimationType = value => {
				props.setAttributes( { animationType: value } );
			};

			const onChangeTextColor = value => {
				props.setAttributes( { textColor: value } );
			};
			// End Other Options.

			return [
				!! props.focus && (
					<InspectorControls key="inspector">
						<BackgroundOptions
							{ ...{ onChangeBackgroundType, onChangeBackgroundImage, onRemoveBackgroundImage, onChangeBackgroundVideo, onRemoveBackgroundVideo, onChangeBackgroundColor, ...props } }
						/>
						<OtherOptions
							{ ...{ onChangeAnimationType, onChangeTextColor, ...props } }
						/>
					</InspectorControls>
				),
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
							autoPlay="false"
							loop=""
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
							autoPlay="false"
							loop=""
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
