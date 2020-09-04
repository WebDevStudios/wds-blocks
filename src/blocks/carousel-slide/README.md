# `Slide` #

A block that contains one or more child blocks and displays a carousel slide.

## Attributes ##

### `fontColor: string` ###
*Default: `undefined`.* Tracks color name for `font-color`.

### `customFontColor: string` ###
*Default: `undefined`.* Tracks custom color code for `font-color`.

### `backgroundType: string` ###
*Default: `none`.* Tracks type of background selected for current `Slide`.

### `backgroundColor: string` ###
*Default: `undefined`.* Tracks color name for `background-color`.

### `customBackgroundColor: string` ###
*Default: `undefined`.* Tracks custom color code for `background-color`.

### `backgroundImage: object` ###
*Default: `undefined`.* Tracks object of image attributes for `background-image`.

### `backgroundVideo: object` ###
*Default: `undefined`.* Tracks object of video attributes for `background-video`.

## Usage ##
*Category: WDS Blocks*

Add `Carousel` block then add any number of `Slide` blocks within. For each `Slide` block, add content and configure settings.

## Settings ##

### Color Settings ###

#### Text Color ###
Controls the base `font-color` for the current `Slide` block, which can be overwritten on a per-block basis from child blocks. Color palette is derived from the current theme settings. Selection is saved to `fontColor` and `customFontColor` attributes.

### Background Settings ###

#### Background Type ####
Controls the type of background displayed for the current `Slide` block. Options are `none`, `color`, `image`, or `video`. If an option other than `none` is selected, the appropriate setting is displayed. Selection is saved to `backgroundType` attribute.

#### Background Color ####
*Only displays when `backgroundType` is set to `color`.* Controls the `background-color` for the current `Slide` block. Color palette is derived from the current theme settings. Selection is saved to `backgroundColor` and `customBackgroundColor` attributes.

#### Background Image ####
*Only displays when `backgroundType` is set to `image`.* Controls the `background-image` for the current `Slide` block via file upload or Media Library. Selection is saved to `backgroundImage` attribute.

#### Background Video ####
*Only displays when `backgroundType` is set to `video`.* Controls the `background-video` for the current `Slide` block via file upload or Media Library. Selection is saved to `backgroundVideo` attribute.

## Screenshots ##

### Editor: `Slide` with Settings Panel ###
![Editor: `Slide` with Settings Panel](../../../assets/carousel-slide/screenshot-1.png)

