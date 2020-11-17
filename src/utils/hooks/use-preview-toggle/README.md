# `usePreviewToggle`

Provide state related to current block mode and ability to toggle between `preview` and `edit` mode.

## Return Object Properties

### `showPreview: Boolean`

The current mode state. Defaults to `true` on first render.

### `togglePreview(): Function`

Toggles `showPreview` to opposite value (i.e., toggles from `preview` to `edit` mode and vice versa).

### `doubleClick(): Function`

Toggles `showPreview` to `false` (`edit` mode) when currently `true` (`preview` mode). To be used as a trigger on block double-click.

## Usage

_Note: `usePreviewToggle` is designed to be used alongside `PreviewToggle` component._

```jsx
export default function Edit(props) {
	const { showPreview, togglePreview, doubleClick } = usePreviewToggle();

	return (
		<>
			<PreviewToggle
				showPreview={showPreview}
				togglePreview={togglePreview}
			/>
			<div onDoubleClick={doubleClick} />
		</>
	);
}
```
