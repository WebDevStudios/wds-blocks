# `ColorPaletteControl` #

Render a `BaseControl` component containing a `ColorPalette` component to select a theme palette or custom color with corresponding `BaseControl.VisualLabel` and `ColorIndicator` components.

## Properties ##

### `color: String` ###
*Required.* The hex code representing the selected color.

### `setColor( value: String ): Function` ###
*Required.* Called when `color` is changed, where `value` is the new hex color code.

### `label: String` ###
*Required.* The label to display for the control.

## Usage ##

```jsx
<InspectorControls>
	<PanelBody>
		<ColorPaletteControl
			color={ color }
			setColor={ setColor }
			label={ __( 'Color', 'wdsblocks' ) }
		/>
	</PanelBody>
</InspectorControls>
```
