# `BackgroundSettingsPanel`

Render a `PanelBody` component containing inputs to toggle background type and control background display.

## Properties

### `backgroundType: String`

_Required._ Type of background to display. Options include `none` and some combination of `color`, `image`, and/or `video`, depending on value of `backgroundOptions`.

### `setBackgroundType( value: String ): Function`

_Required._ Called when `backgroundType` is changed, where `value` is the type of background to display.

### `backgroundOptions: Array`

_Default: `[ 'color', 'image', 'video' ]`._ The allowed options for `backgroundType`, not including the required `none` option.

### `description: String`

_Default: `__( 'Remember: image and video files should be compressed and optimized with tools like ImageOptim (https://imageoptim.com/online) and Handbrake (https://handbrake.fr/) prior to upload. For best results, background media should be at least 1280x720.', 'wdsblocks' )`._ The escaped string representing the panel settings description.

### `backgroundColor: String`

_Optional._ The hex code representing the background color, if selected.

### `setBackgroundColor( value: String ): Function`

_Optional._ Called when `backgroundColor` is changed, where `value` is the new hex color code.

### `backgroundImage: Object`

_Optional._ The object of attributes representing the background image, if selected.

### `setBackgroundImage( value: Object ): Function`

_Optional._ Called when `backgroundImage` is changed, where `value` is the new background image attributes object.

### `backgroundVideo: Object`

_Optional._ The object of attributes representing the background video, if selected.

### `setBackgroundVideo( value: Object ): Function`

_Optional._ Called when `backgroundVideo` is changed, where `value` is the new background video attributes object.

## Usage

_Note: `backgroundColor`/`setBackgroundColor` assumes usage of `withColors` higher-order component._

```jsx
import { InspectorControls, withColors } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';

function Edit(props) {
	const {
		attributes: { backgroundType, backgroundImage, backgroundVideo },
		backgroundColor,
		setBackgroundColor,
		setAttributes,
	} = props;

	return (
		<InspectorControls>
			<BackgroundSettingsPanel
				backgroundType={backgroundType}
				setBackgroundType={(value) =>
					setAttributes({ backgroundType: value })
				}
				backgroundColor={backgroundColor}
				setBackgroundColor={setBackgroundColor}
				backgroundImage={backgroundImage}
				setBackgroundImage={(value) =>
					setAttributes({
						backgroundImage: value,
					})
				}
				backgroundVideo={backgroundVideo}
				setBackgroundVideo={(value) =>
					setAttributes({
						backgroundVideo: value,
					})
				}
			/>
		</InspectorControls>
	);
}

export default compose([withColors({ backgroundColor: 'background-color' })])(
	Edit
);
```
