# `Starter Block` #

A starter block with a richtext and color settings.

## Attributes ##

### `fontColor: string` ###
*Default: `undefined`.* Tracks color name for `font-color`.

### `customFontColor: string` ###
*Default: `undefined`.* Tracks custom color code for `font-color`.

### `showPreview: Boolean` ###
*Default: `true`.* Tracks whether `preview` or `edit` mode is being displayed in the admin editor.

## Usage ##
Use as a starting point when creating new blocks.

## Settings ##

### Color Settings ###

#### Text Color ###
Controls the base `font-color` for the current `Starter` block, which can be overwritten on a per-block basis from child blocks. Color palette is derived from the current theme settings. Selection is saved to `fontColor` and `customFontColor` attributes.

## Toolbar Buttons ##

### Alignment ###
*Default: `full`.* Switch between `wide` (width of post content ) and `full` (width of full page).

### Mode ###
*Default: `preview`.* Switch between `preview` (fully-functional carousel) and `edit` (standard block editor). Can also be toggled from `preview` to `edit` mode by double-clicking on the block.

## Screenshots ##

### Editor: Preview Mode ###
![Editor: Edit Mode](../../../assets/starter/screenshot-1.png)
