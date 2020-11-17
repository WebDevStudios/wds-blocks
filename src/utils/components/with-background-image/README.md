# `withBackgroundImage`

`withBackgroundImage` is a higher-order component used to apply styling specific to image backgrounds.

## Usage

```jsx
export default function Edit(props) {
	const {
		attributes: { backgroundImage },
	} = props;

	const BlockComponent = withBackgroundImage('div');

	return <BlockComponent backgroundImage={backgroundImage} />;
}
```
