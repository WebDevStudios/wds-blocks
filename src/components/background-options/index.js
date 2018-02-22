/**
 * Internal block libraries
 */
const { __ } = wp.i18n;

const { Component } = wp.element;

const {
	InspectorControls,
} = wp.blocks;

const {
	SelectControl,
} = wp.components;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class BackgroundOptions extends Component {
	imageBackgroundSelect() {
		let isImageBackground = __( 'You have selected an image background.' );

		if ( 'image' !== this.props.attributes.backgroundType ) {
			isImageBackground = '';
		}

		return isImageBackground;
	}

	render() {
		return (
			<InspectorControls key="inspector">

				<SelectControl
					key="background-type"
					label={ __( 'Background' ) }
					value={ this.props.attributes.backgroundType ? this.props.attributes.backgroundType : '' }
					options={ [
						{
							label: __( 'None' ),
							value: '',
						},
						{
							label: __( 'Image' ),
							value: 'image',
						},
						{
							label: __( 'Color' ),
							value: 'color',
						},
					] }
					onChange={ this.props.onChangeBackgroundType }
				/>

				{ this.imageBackgroundSelect() }
			</InspectorControls>
		);
	}
}
