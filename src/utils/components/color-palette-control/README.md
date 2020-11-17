# `ColorPaletteControl`

Render a `BaseControl` component containing a `ColorPalette` component to select a theme palette or custom color with corresponding `BaseControl.VisualLabel` and `ColorIndicator` components.

## Properties

### `color: String`

_Required._ The hex code representing the selected color.

### `setColor( value: String ): Function`

_Required._ Called when `color` is changed, where `value` is the new hex color code.

### `label: String`

_Required._ The label to display for the control.

## Usage

_Note: `color`/`setColor` assumes usage of `withColors` higher-order component._

```jsx
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { compose } from '@wordpress/compose';

function Edit( props ) {
	const {
		fontColor
		setFontColor,
	} = props;

	return(
		<InspectorControls>
			<PanelBody>
				<ColorPaletteControl
					color={ fontColor }
					setColor={ setFontColor }
					label={ __( 'Font Color', 'wdsblocks' ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

export default compose( [
	withColors( { fontColor: 'color' } ),
] )( Edit );
```
