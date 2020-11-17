# `withFontColor`

`withFontColor` is a higher-order component used to apply styling specific to font color.

## Usage

```jsx
export default function Edit(props) {
	const {
		attributes: { fontColor, customFontColor },
	} = props;

	const BlockComponent = withFontColor('div');

	return (
		<BlockComponent
			fontColor={fontColor}
			customFontColor={customFontColor}
		/>
	);
}
```
