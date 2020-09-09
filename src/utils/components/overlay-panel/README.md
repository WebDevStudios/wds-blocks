# `OverlayPanel` #

Render a `PanelBody` component containing inputs to control background overlay.

## Properties ##

### `overlayColor: String` ###
*Required.* The hex code representing the overlay color, if selected.

### `setOverlayColor( value: String ): Function` ###
*Required.* Called when `overlayColor` is changed, where `value` is the new hex color code.

### `overlayOpacity: Number` ###
*Required.* The number between 0 and 100 representing the overlay opacity.

### `setOverlayOpacity( value: Number ): Function` ###
*Required.* Called when `overlayOpacity` is changed, where `value` is the new opacity.

## Usage ##

*Note: `overlayColor`/`setOverlayColor` assumes usage of `withColors` higher-order component.*

```jsx
import { InspectorControls, withColors } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';

function Edit( props ) {
	const {
		attributes: {
			overlayOpacity,
		},
		overlayColor,
		setOverlayColor,
		setAttributes,
	} = props;

	return (
		<InspectorControls>
			<OverlayPanel
				overlayColor={ overlayColor }
				setOverlayColor={ setOverlayColor }
				overlayOpacity={ overlayOpacity }
				setOverlayOpacity={ ( value ) =>
					setAttributes( { overlayOpacity: value } )
				}
			/>
		</InspectorControls>
	);
}

export default compose( [
	withColors( { overlayColor: 'background-color' } ),
] )( Edit );
```
