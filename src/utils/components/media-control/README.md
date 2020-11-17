# `MediaControl`

Render a `BaseControl` component containing a `MediaUpload` component with two `MediaUploadCheck` components to upload/select a media item and display a preview wrapped in a `ResponsiveWrapper` component.

## Properties

### `media: Object`

_Optional._ The object of attributes representing the media item.

### `setMedia( value: Object ): Function`

_Optional._ Called when `media` is changed, where `value` is the new media attributes object.

### `type: String`

_Default: `image`._ Type of media item to display.

### `allowedTypes: Array`

_Default: `[ type ]`._ Types of media items to allow in the media uploader/library. Defaults to a single-item array containing the `type`.

### `label: String`

_Optional._ The escaped string representing the input label, media modal title, and preview alt-text, depending on the `type`.

### `addLabel: String`

_Optional._ The escaped string representing the label for the "add media" button.

### `removeLabel: String`

_Optional._ The escaped string representing the label for the "remove media" button.

## Usage

```jsx
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

export default function Edit(props) {
	const {
		attributes: { video },
		setAttributes,
	} = props;

	const setVideo = (value) => {
		setAttributes({
			video: value,
		});
	};

	return (
		<InspectorControls>
			<PanelBody>
				<MediaControl
					media={video}
					setMedia={setVideo}
					type="video"
					label={__('Video', 'wdsblocks')}
					addLabel={__('Add video', 'wdsblocks')}
					removeLabel={__('Remove video', 'wdsblocks')}
				/>
			</PanelBody>
		</InspectorControls>
	);
}
```
