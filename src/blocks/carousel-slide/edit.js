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
		attributes: { backgroundType, backgroundImage, backgroundVideo },
		className,
		setAttributes,
		fontColor,
		setFontColor,
		backgroundColor,
		setBackgroundColor,
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
		'image' === backgroundType && backgroundImage
			? `url(${ backgroundImage.url })`
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
														src={
															backgroundImage.url
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
									title={ __(
										'Background video',
										'wdsblocks'
									) }
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
			<div
				className={ classes.filter( Boolean ).join( ' ' ) }
				style={ styles }
			>
				{ 'video' === backgroundType && backgroundVideo && (
					<video
						autoPlay
						muted
						loop
						aria-hidden="true"
						className="wp-block-cover__video-background"
					>
						<source
							src={ backgroundVideo.url }
							type={ backgroundVideo.mime }
						/>
					</video>
				) }
				<InnerBlocks { ...innerBlocksProps } />
			</div>
		</>
	);
}

export default compose( [
	withColors( { fontColor: 'color', backgroundColor: 'background-color' } ),
] )( Edit );
