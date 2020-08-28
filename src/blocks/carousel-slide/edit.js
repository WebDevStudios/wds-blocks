import {
	ColorPalette,
	InnerBlocks,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	PanelColorSettings,
	withColors,
} from '@wordpress/block-editor';
import {
	BaseControl,
	Button,
	ColorIndicator,
	PanelBody,
	ResponsiveWrapper,
	SelectControl,
	Spinner,
} from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import './editor.scss';

// Set up props for InnerBlocks component.
const innerBlocksProps = {
	allowedBlocks: [ 'core/heading', 'core/paragraph', 'core/buttons' ],
	template: [
		[
			'core/heading',
			{
				content: __( 'Slide Title', 'wdsblocks' ),
				level: 4,
				align: 'center',
			},
		],
		[
			'core/paragraph',
			{
				content: __( 'Slide Content', 'wdsblocks' ),
				align: 'center',
			},
		],
		[
			'core/buttons',
			{ align: 'center' },
			[ [ 'core/button', { text: __( 'Read More', 'wdsblocks' ) } ] ],
		],
	],
};

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @author WebDevStudios
 * @since  2.0.0
 * @see    https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param  {Object} [props] Properties passed from the editor.
 * @return {WPElement}      Element to render.
 */
function Edit( props ) {
	const {
		attributes: {
			backgroundType,
			backgroundImageID,
			backgroundImageURL,
			backgroundVideoID,
			backgroundVideoURL,
		},
		className,
		setAttributes,
		fontColor,
		setFontColor,
		backgroundColor,
		setBackgroundColor,
		backgroundImage,
		backgroundVideo,
	} = props;

	const classes = [ className ],
		styles = {};

	// Add custom color classes.
	classes.push( fontColor.color ? 'has-text-color' : null );
	classes.push( fontColor.class ? fontColor.class : null );
	classes.push(
		backgroundColor || customBackgroundColor ? 'has-background' : null
	);
	classes.push(
		'color' === backgroundType && backgroundColor.class
			? backgroundColor.class
			: null
	);

	// Add custom color styles.
	styles.color = fontColor.color ? fontColor.color : undefined;
	styles.backgroundColor =
		'color' === backgroundType && backgroundColor.color
			? backgroundColor.color
			: undefined;
	styles.backgroundImage =
		'image' === backgroundType && backgroundImageURL
			? `url(${ backgroundImageURL })`
			: undefined;

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color settings', 'wdsblocks' ) }
					colorSettings={ [
						{
							value: fontColor.color,
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
						(https://handbrake.fr/) prior to upload. For best
						results, background media should be at least 1280x720.
					</p>
					<SelectControl
						label={ __( 'Background type', 'wdsblocks' ) }
						value={ backgroundType }
						options={ [
							{ label: 'None', value: 'none' },
							{ label: 'Color', value: 'color' },
							{ label: 'Image', value: 'image' },
							{ label: 'Video', value: 'video' },
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
													{ !! backgroundColor.color && (
														<ColorIndicator
															colorValue={
																backgroundColor.color
															}
															aria-label={ sprintf(
																__(
																	'(Color: %s)'
																),
																backgroundColor.color
															) }
														/>
													) }
												</>
											}
										</BaseControl.VisualLabel>
									</div>
								</legend>
								<ColorPalette
									value={ backgroundColor.color }
									onChange={ setBackgroundColor }
								/>
							</fieldset>
						</BaseControl>
					) }
					{ 'image' === backgroundType && (
						<>
							<MediaUploadCheck>
								<MediaUpload
									title={ __(
										'Background image',
										'wdsblocks'
									) }
									onSelect={ ( value ) =>
										setAttributes( {
											backgroundImageID: value.id,
											backgroundImageURL: value.url,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ backgroundImageID }
									render={ ( { open } ) => (
										<Button
											onClick={ open }
											className={
												! backgroundImageID
													? 'editor-post-featured-image__toggle'
													: 'editor-post-featured-image__preview'
											}
										>
											{ ! backgroundImageID &&
												__( 'Add image', 'wdsblocks' ) }
											{ !! backgroundImageID &&
												! backgroundImage && (
													<Spinner />
												) }
											{ !! backgroundImageID &&
												backgroundImage && (
													<ResponsiveWrapper
														naturalWidth={
															backgroundImage
																.media_details
																.width
														}
														naturalHeight={
															backgroundImage
																.media_details
																.height
														}
													>
														<img
															src={
																backgroundImageURL
															}
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
							{ !! backgroundImageID && (
								<MediaUploadCheck>
									<Button
										onClick={ () =>
											setAttributes( {
												backgroundImageID: undefined,
												backgroundImageURL: undefined,
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
									title={ __(
										'Background video',
										'wdsblocks'
									) }
									onSelect={ ( value ) =>
										setAttributes( {
											backgroundVideoID: value.id,
											backgroundVideoURL: value.url,
										} )
									}
									allowedTypes={ [ 'video' ] }
									value={ backgroundVideoID }
									render={ ( { open } ) => (
										<Button
											onClick={ open }
											className={
												! backgroundVideoID
													? 'editor-post-featured-image__toggle'
													: 'editor-post-featured-image__preview'
											}
										>
											{ ! backgroundVideoID &&
												__( 'Add video', 'wdsblocks' ) }
											{ !! backgroundVideoID &&
												! backgroundVideo && (
													<Spinner />
												) }
											{ !! backgroundVideoID &&
												backgroundVideo && (
													<ResponsiveWrapper
														naturalWidth={
															backgroundVideo
																.media_details
																.width
														}
														naturalHeight={
															backgroundVideo
																.media_details
																.height
														}
													>
														<video
															autoplay=""
															muted
															loop
														>
															<source
																src={
																	backgroundVideoURL
																}
																type={
																	backgroundVideo
																		.media_details
																		.mime_type
																}
															/>
														</video>
													</ResponsiveWrapper>
												) }
										</Button>
									) }
								/>
							</MediaUploadCheck>
							{ !! backgroundVideoID && (
								<MediaUploadCheck>
									<Button
										onClick={ () =>
											setAttributes( {
												backgroundVideoID: undefined,
												backgroundVideoURL: undefined,
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
			<div
				className={ classes.filter( Boolean ).join( ' ' ) }
				style={ styles }
			>
				<InnerBlocks { ...innerBlocksProps } />
			</div>
		</>
	);
}

export default compose( [
	withColors( { fontColor: 'color', backgroundColor: 'background-color' } ),
	withSelect( ( select, props ) => {
		const { getMedia } = select( 'core' );
		const { backgroundImageID, backgroundVideoID } = props.attributes;

		return {
			backgroundImage: backgroundImageID
				? getMedia( backgroundImageID )
				: null,
			backgroundVideo: backgroundVideoID
				? getMedia( backgroundVideoID )
				: null,
		};
	} ),
] )( Edit );
