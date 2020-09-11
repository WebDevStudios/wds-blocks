# `PreviewToggle` #

Render a `BlockControls` component containing a `ToolbarGroup` component that displays a `ToolbarButton` component to toggle between `preview` and `edit` mode for a block.

## Properties ##

### `togglePreview(): Function` ###
*Required.* Called when the toolbar button is clicked and toggles mode state.

### `showPreview: Boolean` ###
*Default: `true`.* The current mode state.

## Usage ##

*Note: `PreviewToggle` is designed to be used alongside `usePreviewToggle` hook.*

```jsx
export default function Edit( props ) {
	const { showPreview, togglePreview } = usePreviewToggle();

	return (
		<PreviewToggle
			showPreview={ showPreview }
			togglePreview={ togglePreview }
		/>
	);
}
```
