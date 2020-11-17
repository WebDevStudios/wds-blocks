# `withBackgroundVideo`

`withBackgroundVideo` is a higher-order component used to apply styling specific to video backgrounds.

## Usage

```jsx
export default function Edit(props) {
	const {
		attributes: { backgroundVideo },
	} = props;

	const BlockComponent = withBackgroundVideo('div');

	return <BlockComponent backgroundVideo={backgroundVideo} />;
}
```
