import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ColorPaletteControl from '../color-palette-control';
import MediaControl from '../media-control';

/**
 * The BackgroundSettingsPanel component displays a panel of controls to toggle between different background options.
 *
 * @author WebDevStudios
 * @since  2.1.0
 * @param {Object} [props] Properties passed to the component.
 * @return {Element}        Element to render.
 */
export default function BackgroundSettingsPanel( props ) {
	const {
		backgroundType,
		setBackgroundType,
		backgroundOptions = [ 'color', 'image', 'video' ],
		description = __(
			'Remember: image and video files should be compressed and optimized with tools like ImageOptim (https://imageoptim.com/online) and Handbrake (https://handbrake.fr/) prior to upload. For best results, background media should be at least 1280x720.',
			'wdsblocks'
		),
		backgroundColor,
		setBackgroundColor,
		backgroundImage,
		setBackgroundImage,
		backgroundVideo,
		setBackgroundVideo,
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
				<MediaControl
					media={ backgroundImage }
					setMedia={ setBackgroundImage }
					label={ __( 'Background image', 'wdsblocks' ) }
					addLabel={ __( 'Add image', 'wdsblocks' ) }
					removeLabel={ __( 'Remove image', 'wdsblocks' ) }
				/>
			) }

			{ 'video' === backgroundType && (
				<MediaControl
					media={ backgroundVideo }
					setMedia={ setBackgroundVideo }
					type="video"
					label={ __( 'Background video', 'wdsblocks' ) }
					addLabel={ __( 'Add video', 'wdsblocks' ) }
					removeLabel={ __( 'Remove video', 'wdsblocks' ) }
				/>
			) }
		</PanelBody>
	);
}
