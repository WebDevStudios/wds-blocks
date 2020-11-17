# `withOverlayColor`

`withOverlayColor` is a higher-order component used to apply styling specific to background overlays.

`withOverlay` calls another HOC, `withBackgroundColor`, to apply some background styling. Both HOCs add custom classes and styles to the wrapped component; `withOverlayColor` additionally adds a child component for the overlay itself, provided the overlay and opacity properties are passed.

## Usage

```jsx
export default function Edit(props) {
	const {
		attributes: { overlayColor, customOverlayColor, overlayOpacity },
	} = props;

	const BlockComponent = withOverlayColor('div');

	return (
		<BlockComponent
			overlayColor={overlayColor}
			customOverlayColor={customOverlayColor}
			overlayOpacity={overlayOpacity}
		/>
	);
}
```
