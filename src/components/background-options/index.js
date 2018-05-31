/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;

const {
	ColorPalette,
	MediaUpload,
} = wp.editor;

const {
	Button,
	Dashicon,
	PanelBody,
	PanelColor,
	PanelRow,
	SelectControl,
} = wp.components;

/**
 * Internal dependencies
 */
import BackgroundOptionsAttributes from './attributes';
import BackgroundOptionsClasses from './classes';
import BackgroundOptionsInlineStyles from './inline-styles';
import BackgroundOptionsVideoOutput from './video';
import './editor.scss';

// Export for ease of importing in individual blocks.
export {
	BackgroundOptionsAttributes,
	BackgroundOptionsClasses,
	BackgroundOptionsInlineStyles,
	BackgroundOptionsVideoOutput,
};

function BackgroundOptions( props ) {
	const setBackgroundType = value => props.setAttributes( { backgroundType: value } );
	const setBackgroundImage = value => props.setAttributes( { backgroundImage: value } );
	const removeBackgroundImage = () => props.setAttributes( { backgroundImage: null } );
	const setBackgroundVideo = value => props.setAttributes( { backgroundVideo: value } );
	const removeBackgroundVideo = () => props.setAttributes( { backgroundVideo: null } );
	const setBackgroundColor = value => props.setAttributes( { backgroundColor: value } );

	const imageBackgroundSelect = () => {
		if ( 'image' !== props.attributes.backgroundType ) {
			return '';
		}

		if ( ! props.attributes.backgroundImage ) {
			return (
				<div className="media-upload-wrapper">
					<p>
						<MediaUpload
							buttonProps={ {
								className: 'components-button button button-large',
							} }
							onSelect={ setBackgroundImage }
							type="image"
							value=""
							render={ ( { open } ) => (
								<Button className="button button-large" onClick={ open }>
									<Dashicon icon="format-image" /> { __( 'Upload Image' ) }
								</Button>
							) }
						/>
					</p>
					<p>
						{ __( 'Add/Upload an image file. (1920x1080px .jpg, .png)' ) }
					</p>
				</div>
			);
		}

		return (
			<div className="image-wrapper">
				<p>
					<img
						src={ props.attributes.backgroundImage.url }
						alt={ props.attributes.backgroundImage.alt }
					/>
				</p>
				{ props.isSelected ? (
					<div className="media-button-wrapper">
						<p>
							<Button
								className="remove-image button button-large"
								onClick={ removeBackgroundImage }
							>
								<Dashicon icon="no-alt" /> { __( 'Remove Image' ) }
							</Button>
						</p>
						<p>
							{ __( 'Add/Upload an image file. (1920x1080px .jpg, .png)' ) }
						</p>
					</div>
				) : null }
			</div>
		);
	};

	const videoBackgroundSelect = () => {
		if ( 'video' !== props.attributes.backgroundType ) {
			return '';
		}

		if ( ! props.attributes.backgroundVideo ) {
			return (
				<div className="media-upload-wrapper">
					<p>
						<MediaUpload
							buttonProps={ {
								className: 'components-button button button-large',
							} }
							onSelect={ setBackgroundVideo }
							type="video"
							value=""
							render={ ( { open } ) => (
								<Button className="button button-large" onClick={ open }>
									<Dashicon icon="format-video" /> { __( 'Upload Video' ) }
								</Button>
							) }
						/>
					</p>
					<p>
						{ __( 'Add/Upload a 1920x1080 .mp4 video file. Note: background videos are only supported on heroes.' ) }
					</p>
				</div>
			);
		}

		return (
			<div className="video-wrapper">
				<p>
					<video className="video-container video-container-overlay">
						<source
							type="video/mp4"
							src={ props.attributes.backgroundVideo.url }
						/>
					</video>
				</p>
				{ props.isSelected ? (
					<div className="media-button-wrapper">
						<p>
							<Button
								className="remove-video button button-large"
								onClick={ removeBackgroundVideo }
							>
								<Dashicon icon="no-alt" /> { __( 'Remove Video' ) }
							</Button>
						</p>

						<p>
							{ __( 'Add/Upload a 1920x1080 .mp4 video file. Note: background videos are only supported on heroes.' ) }
						</p>
					</div>
				) : null }
			</div>
		);
	};

	const colorPanelSelect = () => {
		if ( 'color' !== props.attributes.backgroundType ) {
			return '';
		}

		return (
			<PanelColor
				title={ __( 'Background Color' ) }
				colorValue={ props.attributes.backgroundColor }
			>
				<ColorPalette
					value={ props.attributes.backgroundColor }
					onChange={ setBackgroundColor }
				/>
			</PanelColor>
		);
	};

	return (
		<PanelBody
			title={ __( 'Background Options' ) }
			className="wds-background-options"
			initialOpen={ false }
		>
			<PanelRow>
				<SelectControl
					key="background-type"
					label={ __( 'Background Type' ) }
					value={ props.attributes.backgroundType ? props.attributes.backgroundType : '' }
					options={ [
						{
							label: __( 'None' ),
							value: '',
						},
						{
							label: __( 'Image' ),
							value: 'image',
						},
						{
							label: __( 'Video' ),
							value: 'video',
						},
						{
							label: __( 'Color' ),
							value: 'color',
						},
					] }
					onChange={ setBackgroundType }
				/>
			</PanelRow>
			<PanelRow>
				{ imageBackgroundSelect() }
				{ videoBackgroundSelect() }
				{ colorPanelSelect() }
			</PanelRow>
		</PanelBody>
	);
}

export default BackgroundOptions;
