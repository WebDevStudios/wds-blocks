# `BackgroundSettingsPanel` #

Render a `PanelBody` component containing inputs to toggle background type and control background display.

## Properties ##

### `backgroundType: String` ###
*Required.* Type of background to display. Options include `none` and some combination of `color`, `image`, and/or `video`, depending on value of `backgroundOptions`.

### `setBackgroundType( value: String ): Function` ###
*Required.* Called when `backgroundType` is changed, where `value` is the type of background to display.

### `backgroundOptions: Array` ###
*Default: `[ 'color', 'image', 'video' ]`.* The allowed options for `backgroundType`, not including the required `none` option.

### `description: String` ###
*Default: `__( 'Remember: image and video files should be compressed and optimized with tools like ImageOptim (https://imageoptim.com/online) and Handbrake (https://handbrake.fr/) prior to upload. For best results, background media should be at least 1280x720.', 'wdsblocks' )`.* The escaped string representing the panel settings description.

### `backgroundColor: String` ###
*Optional.* The hex code representing the background color, if selected.

### `setBackgroundColor( value: String ): Function` ###
*Optional.* Called when `backgroundColor` is changed, where `value` is the new hex color code.

### `backgroundImage: Object` ###
*Optional.* The object of attributes representing the background image, if selected.

### `setBackgroundImage( value: Object ): Function` ###
*Optional.* Called when `backgroundImage` is changed, where `value` is the new background image attributes object.

### `backgroundVideo: Object` ###
*Optional.* The object of attributes representing the background video, if selected.

### `setBackgroundVideo( value: Object ): Function` ###
*Optional.* Called when `backgroundVideo` is changed, where `value` is the new background video attributes object.

## Usage ##

*Note: `backgroundColor`/`setBackgroundColor` assumes usage of `withColors` higher-order component.*

```jsx
import { InspectorControls, withColors } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';

function Edit( props ) {
	const {
		attributes: {
			backgroundType,
			backgroundImage,
			backgroundVideo,
		},
		backgroundColor,
		setBackgroundColor,
		setAttributes,
	} = props;

	return (
		<InspectorControls>
			<BackgroundSettingsPanel
				backgroundType={ backgroundType }
				setBackgroundType={ ( value ) =>
					setAttributes( { backgroundType: value } )
				}
				backgroundColor={ backgroundColor }
				setBackgroundColor={ setBackgroundColor }
				backgroundImage={ backgroundImage }
				setBackgroundImage={ ( value ) =>
					setAttributes( {
						backgroundImage: value,
					} )
				}
				backgroundVideo={ backgroundVideo }
				setBackgroundVideo={ ( value ) =>
					setAttributes( {
						backgroundVideo: value,
					} )
				}
			/>
		</InspectorControls>
	);
}

export default compose( [
	withColors( { backgroundColor: 'background-color' } ),
] )( Edit );
```
