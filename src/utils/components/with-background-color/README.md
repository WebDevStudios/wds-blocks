# `withBackgroundColor`

`withBackgroundColor` is a higher-order component used to apply styling specific to color backgrounds.

## Usage

```jsx
export default function Edit(props) {
	const {
		attributes: { backgroundColor, customBackgroundColor },
	} = props;

	const BlockComponent = withBackgroundColor('div');

	return (
		<BlockComponent
			backgroundColor={backgroundColor}
			customBackgroundColor={customBackgroundColor}
		/>
	);
}
```
