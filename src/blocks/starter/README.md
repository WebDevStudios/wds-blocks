# `Starter Block` #

A starter block with a richtext and color settings.

## Attributes ##

### `title: array` ###
*Default: `undefined'`.* Richtext block title.

### `contentStyle: object` ###
*Default: `backgroundColor: 'transparent'`.* Tracks background color for block.

### `backgroundStyle: object` ###
*Default: `color: '#000000', textAlign: 'left'`.* Tracks custom color and alignment for `title`.

### `showPreview: Boolean` ###
*Default: `true`.* Tracks whether `preview` or `edit` mode is being displayed in the admin editor.

## Usage ##
Use as a starting point when creating new blocks.

## Settings ##

### Color Settings ###

#### Text Color ###
Controls the base `font-color` for the current `Starter` block, which can be overwritten on a per-block basis from child blocks. Color palette is derived from the current theme settings. Selection is saved to `contentStyle` attribute.

#### Background Color ###
Controls the base `background-color` for the current `Starter` block, which can be overwritten on a per-block basis from child blocks. Color palette is derived from the current theme settings. Selection is saved to the `backgroundStyle` attribute.

## Toolbar Buttons ##

### Alignment ###
*Default: `full`.* Switch between `wide` (width of post content ), `full` (width of full page), `left`, `center`, or `right`.

### Text Alignment ###
*Default: `left`.* Switch between `Align text left`, `Align text center`, or `Align text right`.

### Mode ###
*Default: `preview`.* Switch between `preview` (fully-functional carousel) and `edit` (standard block editor). Can also be toggled from `preview` to `edit` mode by double-clicking on the block.

