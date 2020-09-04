import {
	ColorPalette,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	ColorIndicator,
	PanelBody,
	ResponsiveWrapper,
	SelectControl,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';

/**
 * The Settings component displays settings for the Slide block via Inspector Controls.
 *
 * @author WebDevStudios
 * @since  2.0.0
 *
 * @param  {Object} [props] Properties passed to the component.
 * @return {Element}        Element to render.
 */
export default function Settings( props ) {
	const {
		fontColor,
		setFontColor,
		backgroundType,
		backgroundColor,
		setBackgroundColor,
		backgroundImage,
		backgroundVideo,
		setAttributes,
	} = props;

	return (
		<InspectorControls>
			<PanelColorSettings
				title={ __( 'Color settings', 'wdsblocks' ) }
				colorSettings={ [
					{
						value: fontColor,
						onChange: setFontColor,
						label: __( 'Text Color', 'wdsblocks' ),
					},
				] }
			/>
			<PanelBody
				title={ __( 'Background settings', 'wdsblocks' ) }
				className="block-editor-panel-color-gradient-settings"
			>
				<p className="description">
					Remember: image and video files should be compressed and
					optimized with tools like ImageOptim
					(https://imageoptim.com/online) and Handbrake
					(https://handbrake.fr/) prior to upload. For best results,
					background media should be at least 1280x720.
				</p>
				<SelectControl
					label={ __( 'Background type', 'wdsblocks' ) }
					value={ backgroundType }
					options={ [
						{ label: __( 'None', 'wdsblocks' ), value: 'none' },
						{ label: __( 'Color', 'wdsblocks' ), value: 'color' },
						{ label: __( 'Image', 'wdsblocks' ), value: 'image' },
						{ label: __( 'Video', 'wdsblocks' ), value: 'video' },
					] }
					onChange={ ( value ) =>
						setAttributes( { backgroundType: value } )
					}
				></SelectControl>
				{ 'color' === backgroundType && (
					<BaseControl>
						<fieldset>
							<legend>
								<div className="block-editor-color-gradient-control__color-indicator">
									<BaseControl.VisualLabel>
										{
											<>
												{ __(
													'Background Color',
													'wdsblocks'
												) }
												{ !! backgroundColor && (
													<ColorIndicator
														colorValue={
															backgroundColor
														}
														aria-label={ sprintf(
															/* translators: current color value name */
															__( '(Color: %s)' ),
															backgroundColor
														) }
													/>
												) }
											</>
										}
									</BaseControl.VisualLabel>
								</div>
							</legend>
							<ColorPalette
								value={ backgroundColor }
								onChange={ setBackgroundColor }
							/>
						</fieldset>
					</BaseControl>
				) }
				{ 'image' === backgroundType && (
					<>
						<MediaUploadCheck>
							<MediaUpload
								title={ __( 'Background image', 'wdsblocks' ) }
								onSelect={ ( value ) =>
									setAttributes( {
										backgroundImage: value,
									} )
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
													backgroundImage.width
												}
												naturalHeight={
													backgroundImage.height
												}
											>
												<img
													src={ backgroundImage.url }
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
										setAttributes( {
											backgroundImage: undefined,
										} )
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
									setAttributes( {
										backgroundVideo: value,
									} )
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
													backgroundVideo.width
												}
												naturalHeight={
													backgroundVideo.height
												}
											>
												<video
													autoPlay
													muted
													loop
													aria-hidden="true"
												>
													<source
														src={
															backgroundVideo.url
														}
														type={
															backgroundVideo.mime
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
										setAttributes( {
											backgroundVideo: undefined,
										} )
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
		</InspectorControls>
	);
}
