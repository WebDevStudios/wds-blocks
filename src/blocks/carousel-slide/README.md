# `Slide`

A block that contains one or more child blocks and displays a carousel slide.

## Attributes

### `fontColor: string`

_Default: `undefined`._ Tracks color name for `font-color`.

### `customFontColor: string`

_Default: `undefined`._ Tracks custom color code for `font-color`.

### `backgroundType: string`

_Default: `none`._ Tracks type of background selected for current `Slide`.

### `backgroundColor: string`

_Default: `undefined`._ Tracks color name for `background-color`.

### `customBackgroundColor: string`

_Default: `undefined`._ Tracks custom color code for `background-color`.

### `backgroundImage: object`

_Default: `undefined`._ Tracks object of image attributes for `background-image`.

### `backgroundVideo: object`

_Default: `undefined`._ Tracks object of video attributes for `background-video`.

### `overlayColor: string`

_Default: `undefined`._ Tracks color name for `background-color` as an overlay.

### `customOverlayColor: string`

_Default: `undefined`._ Tracks custom color code for `background-color` as an overlay.

### `overlayOpacity: number`

_Default: `undefined`._ Tracks value for `opacity` of overlay.

## Usage

### Category: WDS Blocks

Add `Carousel` block then add any number of `Slide` blocks within. For each `Slide` block, add content and configure settings.

## Settings

### Color Settings

#### Text Color

Controls the base `font-color` for the current `Slide` block, which can be overwritten on a per-block basis from child blocks. Color palette is derived from the current theme settings. Selection is saved to `fontColor` and `customFontColor` attributes.

### Background Settings

#### Background Type

Controls the type of background displayed for the current `Slide` block. Options are `none`, `color`, `image`, or `video`. If an option other than `none` is selected, the appropriate setting is displayed. Selection is saved to `backgroundType` attribute.

#### Background Color

_Only displays when `backgroundType` is set to `color`._ Controls the `background-color` for the current `Slide` block. Color palette is derived from the current theme settings. Selection is saved to `backgroundColor` and `customBackgroundColor` attributes.

#### Background Image

_Only displays when `backgroundType` is set to `image`._ Controls the `background-image` for the current `Slide` block via file upload or Media Library. Selection is saved to `backgroundImage` attribute.

#### Background Video

_Only displays when `backgroundType` is set to `video`._ Controls the `background-video` for the current `Slide` block via file upload or Media Library. Selection is saved to `backgroundVideo` attribute.

## Screenshots

### Editor: `Slide` with Settings Panel

![Editor: `Slide` with Settings Panel](../../../assets/carousel-slide/screenshot-1.png)
