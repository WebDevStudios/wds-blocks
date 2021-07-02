import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorPaletteControl from '../color-palette-control';
import MediaControl from '../media-control';

/**
 * The BackgroundSettingsPanel component displays a panel of controls to toggle between different background options.
 *
 * @author ElPuas
 * @since  2.1.0
 *
 * @param  {Object} [props] Properties passed to the component.
 * @return {Element}        Element to render.
 */
export default function BackgroundSettingsPanel( props ) {
	const {
		backgroundType,
		setBackgroundType,
		backgroundOptions = [ 'color', 'image', 'video' ],
		description = __(
			'Remember: image and video files should be compressed and optimized with tools like ImageOptim (https://imageoptim.com/online) and Handbrake (https://handbrake.fr/) prior to upload. For best results, background media should be at least 1280x720.',
			'vigor'
		),
		backgroundColor,
		setBackgroundColor,
		backgroundImage,
		setBackgroundImage,
		backgroundVideo,
		setBackgroundVideo,
	} = props;

	// Define background type options.
	const options = [ { label: __( 'None', 'vigor' ), value: 'none' } ];

	// Add color option if specified in props.
	if ( backgroundOptions.includes( 'color' ) ) {
		options.push( { label: __( 'Color', 'vigor' ), value: 'color' } );
	}

	// Add image option if specified in props.
	if ( backgroundOptions.includes( 'image' ) ) {
		options.push( { label: __( 'Image', 'vigor' ), value: 'image' } );
	}

	// Add video option if specified in props.
	if ( backgroundOptions.includes( 'video' ) ) {
		options.push( { label: __( 'Video', 'vigor' ), value: 'video' } );
	}

	return (
		<PanelBody
			title={ __( 'Background settings', 'vigor' ) }
			className="block-editor-panel-color-gradient-settings"
		>
			{ description && <p className="description">{ description }</p> }

			<SelectControl
				label={ __( 'Background type', 'vigor' ) }
				value={ backgroundType }
				options={ options }
				onChange={ setBackgroundType }
			></SelectControl>

			{ 'color' === backgroundType && (
				<ColorPaletteControl
					color={ backgroundColor }
					setColor={ setBackgroundColor }
					label={ __( 'Background Color', 'vigor' ) }
				/>
			) }

			{ 'image' === backgroundType && (
				<MediaControl
					media={ backgroundImage }
					setMedia={ setBackgroundImage }
					label={ __( 'Background image', 'vigor' ) }
					addLabel={ __( 'Add image', 'vigor' ) }
					removeLabel={ __( 'Remove image', 'vigor' ) }
				/>
			) }

			{ 'video' === backgroundType && (
				<MediaControl
					media={ backgroundVideo }
					setMedia={ setBackgroundVideo }
					type="video"
					label={ __( 'Background video', 'vigor' ) }
					addLabel={ __( 'Add video', 'vigor' ) }
					removeLabel={ __( 'Remove video', 'vigor' ) }
				/>
			) }
		</PanelBody>
	);
}
