# `Starter Block`

A starter block with a RichText heading and color options.

## Attributes

### `title: array`

_Default: `undefined'`._ Richtext block title.

### `contentStyle: object`

_Default: `backgroundColor: 'transparent'`._ Tracks background color for block.

### `backgroundStyle: object`

_Default: `color: '#000000', textAlign: 'left'`._ Tracks custom color and alignment for `title`.

### `showPreview: Boolean`

_Default: `true`._ Tracks whether `preview` or `edit` mode is being displayed in the admin editor.

## Usage

Use as a starting point when creating new blocks.

## Settings

### Color Settings

#### Text Color

Controls the base `font-color` for the current `Starter` block, which can be overwritten on a per-block basis from child blocks. Color palette is derived from the current theme settings. Selection is saved to `contentStyle` attribute.

#### Background Color

Controls the base `background-color` for the current `Starter` block, which can be overwritten on a per-block basis from child blocks. Color palette is derived from the current theme settings. Selection is saved to the `backgroundStyle` attribute.

## Toolbar Buttons

### Alignment

_Default: `full`._ Switch between `wide` (width of post content ), `full` (width of full page), `left`, `center`, or `right`.

### Text Alignment

_Default: `left`._ Switch between `Align text left`, `Align text center`, or `Align text right`.

### Mode

_Default: `preview`._ Switch between `preview` (fully-functional carousel) and `edit` (standard block editor). Can also be toggled from `preview` to `edit` mode by double-clicking on the block.
