import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	ResponsiveWrapper,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorPaletteControl from '../color-palette-control';

/**
 * The BackgroundSettingsPanel component displays a panel of controls to toggle between different background options.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {Object} [props] Properties passed to the component.
 * @return {Element}        Element to render.
 */
export default function BackgroundSettingsPanel( props ) {
	const {
		backgroundOptions = [ 'color', 'image', 'video' ],
		backgroundType,
		setBackgroundType,
		backgroundColor,
		setBackgroundColor,
		backgroundImage,
		setBackgroundImage,
		backgroundVideo,
		setBackgroundVideo,
		description = __(
			'Remember: image and video files should be compressed and optimized with tools like ImageOptim (https://imageoptim.com/online) and Handbrake (https://handbrake.fr/) prior to upload. For best results, background media should be at least 1280x720.',
			'wdsblocks'
		),
	} = props;

	// Define background type options.
	const options = [ { label: __( 'None', 'wdsblocks' ), value: 'none' } ];

	// Add color option if specified in props.
	if ( backgroundOptions.includes( 'color' ) ) {
		options.push( { label: __( 'Color', 'wdsblocks' ), value: 'color' } );
	}

	// Add image option if specified in props.
	if ( backgroundOptions.includes( 'image' ) ) {
		options.push( { label: __( 'Image', 'wdsblocks' ), value: 'image' } );
	}

	// Add video option if specified in props.
	if ( backgroundOptions.includes( 'video' ) ) {
		options.push( { label: __( 'Video', 'wdsblocks' ), value: 'video' } );
	}

	return (
		<PanelBody
			title={ __( 'Background settings', 'wdsblocks' ) }
			className="block-editor-panel-color-gradient-settings"
		>
			{ description && <p className="description">{ description }</p> }
			<SelectControl
				label={ __( 'Background type', 'wdsblocks' ) }
				value={ backgroundType }
				options={ options }
				onChange={ setBackgroundType }
			></SelectControl>
			{ 'color' === backgroundType && (
				<ColorPaletteControl
					color={ backgroundColor }
					setColor={ setBackgroundColor }
					label={ __( 'Background Color', 'wdsblocks' ) }
				/>
			) }
			{ 'image' === backgroundType && (
				<>
					<MediaUploadCheck>
						<MediaUpload
							title={ __( 'Background image', 'wdsblocks' ) }
							onSelect={ ( value ) =>
								setBackgroundImage( value )
							}
							allowedTypes={ [ 'image' ] }
							value={ backgroundImage }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									className={
										! backgroundImage
											? 'editor-post-featured-image__toggle'
											: 'editor-post-featured-image__preview'
									}
								>
									{ ! backgroundImage &&
										__( 'Add image', 'wdsblocks' ) }
									{ !! backgroundImage && (
										<ResponsiveWrapper
											naturalWidth={
												backgroundImage?.width
											}
											naturalHeight={
												backgroundImage?.height
											}
										>
											<img
												src={ backgroundImage?.url }
												alt={ __(
													'Background image',
													'wdsblocks'
												) }
											/>
										</ResponsiveWrapper>
									) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ !! backgroundImage && (
						<MediaUploadCheck>
							<Button
								onClick={ () =>
									setBackgroundImage( undefined )
								}
								isLink
								isDestructive
							>
								{ __( 'Remove image', 'wdsblocks' ) }
							</Button>
						</MediaUploadCheck>
					) }
				</>
			) }
			{ 'video' === backgroundType && (
				<>
					<MediaUploadCheck>
						<MediaUpload
							title={ __( 'Background video', 'wdsblocks' ) }
							onSelect={ ( value ) =>
								setBackgroundVideo( value )
							}
							allowedTypes={ [ 'video' ] }
							value={ backgroundVideo }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									className={
										! backgroundVideo
											? 'editor-post-featured-image__toggle'
											: 'editor-post-featured-image__preview'
									}
								>
									{ ! backgroundVideo &&
										__( 'Add video', 'wdsblocks' ) }
									{ !! backgroundVideo && (
										<ResponsiveWrapper
											naturalWidth={
												backgroundVideo?.width
											}
											naturalHeight={
												backgroundVideo?.height
											}
										>
											<video
												autoPlay
												muted
												loop
												aria-hidden="true"
											>
												<source
													src={ backgroundVideo?.url }
													type={
														backgroundVideo?.mime
													}
												/>
											</video>
										</ResponsiveWrapper>
									) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ !! backgroundVideo && (
						<MediaUploadCheck>
							<Button
								onClick={ () =>
									setBackgroundVideo( undefined )
								}
								isLink
								isDestructive
							>
								{ __( 'Remove video', 'wdsblocks' ) }
							</Button>
						</MediaUploadCheck>
					) }
				</>
			) }
		</PanelBody>
	);
}
