# `OverlayPanel`

Render a `PanelBody` component containing inputs to control background overlay.

## Properties

### `overlayColor: String`

_Required._ The hex code representing the overlay color, if selected.

### `setOverlayColor( value: String ): Function`

_Required._ Called when `overlayColor` is changed, where `value` is the new hex color code.

### `overlayOpacity: Number`

_Required._ The number between 0 and 100 representing the overlay opacity.

### `setOverlayOpacity( value: Number ): Function`

_Required._ Called when `overlayOpacity` is changed, where `value` is the new opacity.

## Usage

_Note: `overlayColor`/`setOverlayColor` assumes usage of `withColors` higher-order component._

```jsx
import { InspectorControls, withColors } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';

function Edit(props) {
	const {
		attributes: { overlayOpacity },
		overlayColor,
		setOverlayColor,
		setAttributes,
	} = props;

	return (
		<InspectorControls>
			<OverlayPanel
				overlayColor={overlayColor}
				setOverlayColor={setOverlayColor}
				overlayOpacity={overlayOpacity}
				setOverlayOpacity={(value) =>
					setAttributes({ overlayOpacity: value })
				}
			/>
		</InspectorControls>
	);
}

export default compose([withColors({ overlayColor: 'background-color' })])(
	Edit
);
```
